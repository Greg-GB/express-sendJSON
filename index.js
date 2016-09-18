var utils = require('./lib/helperUtils');

function getOpts(middlewareOpts, responseOpts) {
    if (typeof responseOpts.code !== 'object') {
        responseOpts = {code: {value: Number(responseOpts.code)}};
    }

    var defaultOptions = {
        apiVersion: {
            enabled: false,
            value: "1.0.0"
        },
        status: {
            enabled: false,
            value: "success"
        },
        count: {
            enabled: true
        },
        code: {
            enabled: true,
            value: 200
        }
    };

    return utils.assign({}, defaultOptions, middlewareOpts, responseOpts);
}

function generateSuccessPayload(data, options) {
    if (data === undefined || data === null || typeof data !== 'object') {
        throw new TypeError('Data is not an object.');
    }

    return {
        apiVersion: options.apiVersion.enabled ? options.apiVersion.value : undefined,
        count: options.count.enabled && (Array.isArray(data)) ? data.length : undefined,
        code: options.code.enabled ? options.code.value : undefined,
        status: options.status.enabled ? options.status.value : undefined,
        data: data
    }
}

function sendJSON(middlewareOpts) {
    middlewareOpts = middlewareOpts || {};
    if (typeof middlewareOpts !== 'object') {
        throw new Error('Options is not an object.');
    }

    return function(req, res, next) {
        res.sendJSON = function(data, responseOpts) {
            responseOpts = responseOpts || {};
            var options = getOpts(middlewareOpts, responseOpts);

            return res
                .status(options.code.value)
                .json(generateSuccessPayload(data, options));
        };
        next();
    }
}

module.exports = sendJSON;