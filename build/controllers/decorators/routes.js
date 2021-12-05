"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.patch = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
const Methods_1 = require("./Methods");
const MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, _desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.Get);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.put = routeBinder(Methods_1.Methods.Put);
exports.patch = routeBinder(Methods_1.Methods.Patch);
exports.del = routeBinder(Methods_1.Methods.Del);
