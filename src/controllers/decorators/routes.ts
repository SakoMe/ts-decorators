import 'reflect-metadata';

import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function routeBinder(method: string): Function {
	return function (path: string): Function {
		return function (target: any, key: string, desc: PropertyDescriptor): void {
			Reflect.defineMetadata(MetadataKeys.Path, path, target, key);
			Reflect.defineMetadata(MetadataKeys.Method, method, target, key);
		};
	};
}

export const get = routeBinder(Methods.Get);
export const post = routeBinder(Methods.Post);
export const put = routeBinder(Methods.Put);
export const patch = routeBinder(Methods.Patch);
export const del = routeBinder(Methods.Del);
