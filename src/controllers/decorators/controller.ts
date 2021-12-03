import 'reflect-metadata';

import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function controller(routePrefix: string): Function {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (const key of Object.getOwnPropertyNames(target.prototype)) {
			const routeHandler = target.prototype[key];

			const path: string = Reflect.getMetadata(
				MetadataKeys.Path,
				target.prototype,
				key
			);

			const method: Methods = Reflect.getMetadata(
				MetadataKeys.Method,
				target.prototype,
				key
			);

			const middlewares: RequestHandler[] =
				Reflect.getMetadata(MetadataKeys.Middleware, target.prototype, key) ||
				[];

			if (path)
				router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
		}
	};
}
