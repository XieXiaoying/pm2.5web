// 深度拷贝
/* eslint-disable */
export function deepCopy(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key]==='object' ? deepCopy(source[key]): source[key];
    }
    return result;
}