import 'reflect-metadata';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string[]): RequestHandler {
	return function (
		request: Request,
		response: Response,
		next: NextFunction
	): void {
		if (!request.body) response.status(422).send('Invalid request');

		for (const key of keys) {
			if (!request.body[key])
				response.status(422).send(`Missing property ${key}`);
		}

		next();
	};
}

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

			const requiredBodyProps: string[] =
				Reflect.getMetadata(
					MetadataKeys.BodyValidator,
					target.prototype,
					key
				) || [];

			const bodyValidator = bodyValidators(requiredBodyProps);

			if (path)
				router[method](
					`${routePrefix}${path}`,
					...middlewares,
					bodyValidator,
					routeHandler
				);
		}
	};
}
