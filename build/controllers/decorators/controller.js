"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(keys) {
    return function (request, response, next) {
        if (!request.body)
            response.status(422).send('Invalid request');
        for (const key of keys) {
            if (!request.body[key])
                response.status(422).send(`Missing property ${key}`);
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        const router = AppRouter_1.AppRouter.getInstance();
        for (const key of Object.getOwnPropertyNames(target.prototype)) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.Middleware, target.prototype, key) ||
                [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.BodyValidator, target.prototype, key) || [];
            const bodyValidator = bodyValidators(requiredBodyProps);
            if (path)
                router[method](`${routePrefix}${path}`, ...middlewares, bodyValidator, routeHandler);
        }
    };
}
exports.controller = controller;
