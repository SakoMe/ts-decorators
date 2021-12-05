"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
function bodyValidator(...keys) {
    return function (target, key) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.BodyValidator, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
