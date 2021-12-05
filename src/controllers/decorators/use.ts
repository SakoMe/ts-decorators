import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler): Function {
	return function (target: Object, key: string): void {
		const middlewares =
			Reflect.getMetadata(MetadataKeys.Middleware, target, key) || [];

		Reflect.defineMetadata(
			MetadataKeys.Middleware,
			[...middlewares, middleware],
			target,
			key
		);
	};
}
