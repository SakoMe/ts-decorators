import 'reflect-metadata';

import { AppRouter } from '../../AppRouter';

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();

		for (const key of Object.getOwnPropertyNames(target.prototype)) {
			const routeHandler = target.prototype[key];
			const path = Reflect.getMetadata('path', target.prototype, key);

			if (path) {
				router.get(`${routePrefix}${path}`, routeHandler);
			}
		}
	};
}
