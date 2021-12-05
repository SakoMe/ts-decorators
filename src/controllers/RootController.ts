import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(
	request: Request,
	response: Response,
	next: NextFunction
): void {
	if (request.session?.loggedIn) {
		next();
		return;
	} else {
		response.status(403).send('Not authorized');
	}
}

@controller('')
export class RootController {
	@get('/')
	getRoot(request: Request, response: Response): void {
		if (request.session?.loggedIn) {
			response.send(`
      <div>
        <div>You are logged in</div>
        <a href="/auth/logout">Log Out</a>
      </div>
    `);
		} else {
			response.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/auth/login">Log In</a>
      </div>
    `);
		}
	}

	@get('/protected')
	@use(requireAuth)
	getProtected(_request: Request, response: Response): void {
		response.send(`
    <div>Welcome to protected</div>
  `);
	}
}
