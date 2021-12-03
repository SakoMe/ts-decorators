import express, { IRouter } from 'express';

export class AppRouter {
	private static instance: IRouter;

	static getInstance(): IRouter {
		if (!AppRouter.instance) {
			AppRouter.instance = express.Router();
		}

		return AppRouter.instance;
	}
}
