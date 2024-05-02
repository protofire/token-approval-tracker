"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceToSet = exports.reduceToMap = void 0;
/**
 * Creates a Map from an array and a key function.
 * @param list array that should be reduced
 * @param keyFunc computes to which key the list entry will be added
 * @returns a map which maps from keys to all list entries, which computed that key for their value
 */
function reduceToMap(list, keyFunc) {
    return list.reduce(function (prev, curr) {
        var _a;
        var key = keyFunc(curr);
        prev.has(key) ? (_a = prev.get(key)) === null || _a === void 0 ? void 0 : _a.push(curr) : prev.set(key, [curr]);
        return prev;
    }, new Map());
}
exports.reduceToMap = reduceToMap;
/**
 * Creates a set from an array and a value function.
 * @param list array that should be reduced
 * @param valueFunc computes the value for list entry and adds it to the set
 * @returns the resulting set
 */
function reduceToSet(list, valueFunc) {
    return list.reduce(function (prev, curr) {
        var value = valueFunc(curr);
        prev.add(value);
        return prev;
    }, new Set());
}
exports.reduceToSet = reduceToSet;
