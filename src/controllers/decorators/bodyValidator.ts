import 'reflect-metadata';

import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]): Function {
	return function (target: Object, key: string): void {
		Reflect.defineMetadata(MetadataKeys.BodyValidator, keys, target, key);
	};
}
