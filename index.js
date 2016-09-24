var utils = require('./lib/helperUtils');

function getOpts(middlewareOpts, responseOpts, data) {
    var defaultOptions = {
        apiVersion: {
            enabled: false,
            value: "1.0.0"
        },
        status: {
            enabled: false,
            value: (data instanceof Error) ? "error" : "success"
        },
        count: {
            enabled: true
        },
        statusCode: {
            enabled: true,
            value: (data instanceof Error) ? (data.statusCode || 500) : 200
        }
    };

    return utils.assign({}, defaultOptions, middlewareOpts, responseOpts);
}

function generatePayload(data, options) {
    if (data === undefined || data === null || typeof data !== 'object') {
        throw new TypeError('Data is not an object.');
    }

    var payload = {};
    var payloadModel = {
        apiVersion: {
            check: !!options.apiVersion.enabled,
            value: options.apiVersion.value
        },
        count: {
            check: options.count.enabled && (Array.isArray(data)),
            value: data.length
        },
        statusCode: {
            check: !!options.statusCode.enabled,
            value: options.statusCode.value
        },
        status: {
            check: !!options.status.enabled,
            value: options.status.value
        },
        data: {
            check: !!data,
            value: data
        }
    };

    Object.keys(payloadModel).forEach(function(k) {
        if (payloadModel[k].check) {
            payload[k] = payloadModel[k].value;
        }
    });

    return payload;
}

function sendJSON(middlewareOpts) {
    middlewareOpts = middlewareOpts || {};
    if (typeof middlewareOpts !== 'object') {
        throw new Error('Options is not an object.');
    }

    return function(req, res, next) {
        res.sendJSON = function(data, responseOpts) {
            responseOpts = responseOpts || {};
            data = data || {};
            var options = getOpts(middlewareOpts, responseOpts, data);
            var payload = generatePayload(data, options);

            return res
                .status(payload.statusCode)
                .json(payload);
        };
        next();
    }
}

module.exports = sendJSON;