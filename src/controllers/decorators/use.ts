import 'reflect-metadata';
import { RequestHandler } from 'express';

import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler): Function {
	return function (target: any, key: string, desc: PropertyDescriptor): void {
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
