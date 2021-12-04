import 'reflect-metadata';

import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...keys: string[]): Function {
	return function (target: any, key: string, desc: PropertyDescriptor): void {
		Reflect.defineMetadata(MetadataKeys.BodyValidator, keys, target, key);
	};
}