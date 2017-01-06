'use strict';

var utils = require('./lib/helperUtils');

function getOpts(middlewareOpts, overrides) {
    overrides = overrides || {};

    var defaultOptions = {
        responseProperty: {
            value: "data"
        },
        apiVersion: {
            enabled: false,
            value: "1.0.0"
        },
        status: {
            enabled: false,
            value: function(data) {
                return (data instanceof Error) ? "error" : "success";
            }
        },
        count: {
            enabled: false
        },
        statusCode: {
            enabled: false,
            value: function(data) {
                return (data instanceof Error) ? 500 : 200
            }
        }
    };

    return utils.assign({}, defaultOptions, middlewareOpts, overrides);
}

function generatePayload(data, options) {
    data = data || {};
    if (data === undefined || data === null || typeof data !== 'object') {
        throw new TypeError('Data is not an object.');
    }

    var payload = {};
    var payloadModel = {
        apiVersion: {
            check: options.apiVersion.enabled,
            value: options.apiVersion.value
        },
        count: {
            check: options.count.enabled && (Array.isArray(data)),
            value: data.length
        },
        statusCode: {
            check: options.statusCode.enabled,
            value: options.statusCode.value(data)
        },
        status: {
            check: options.status.enabled,
            value: options.status.value(data)
        }
    };
    // ES5 compatible instead of using ComputePropertyNames
    payloadModel[options.responseProperty.value] = {
        check: true,
        value: data
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
        throw new Error('Options must be an object.');
    }

    return function(req, res, next) {
        res.sendJSON = function(data, statusCode) {
            middlewareOpts = middlewareOpts || {};
            data = data || {};

            if (statusCode && typeof statusCode != 'number') {
                throw new Error('Status code must be a number.');
            }

            if (typeof middlewareOpts !== 'object') {
                throw new Error('Response options must be an object.');
            }

            var options = (statusCode) ? getOpts(middlewareOpts, {
                statusCode: {
                    enabled: true,
                    value: function() {
                        return statusCode;
                    }
                }}) : getOpts(middlewareOpts);
            var payload = generatePayload(data, options);

            return res
                .status(options.statusCode.value())
                .json(payload);
        };
        next();
    }
}

module.exports = sendJSON;