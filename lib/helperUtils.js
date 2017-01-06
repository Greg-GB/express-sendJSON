'use strict';

function _deepCopy(target, source) {
    if (source === undefined || source === null || typeof source !== 'object') {
        throw new Error('Source is not an object.');
    }

    var sourceKeys = Object.keys(source);
    var i = sourceKeys.length;

    while (i--) {
        if (typeof source[sourceKeys[i]] === 'object') {
            if (!target[sourceKeys[i]]) {
                target[sourceKeys[i]] = source[sourceKeys[i]];
            } else {
                _deepCopy(target[sourceKeys[i]], source[sourceKeys[i]]);
            }
        } else {
            if (typeof target[sourceKeys[i]] !== typeof source[sourceKeys[i]]) {
                throw new Error('Unable to change target value type.');
            }
            target[sourceKeys[i]] = source[sourceKeys[i]];
        }
    }
}

function assign(target) {
    if (target === undefined || target === null || typeof target !== 'object') {
        throw new Error('Target is not an object.');
    }

    for (var s = 1; s < arguments.length; s++) {
        _deepCopy(target, arguments[s]);
    }
    return target;
}

module.exports = {
    assign: assign
};