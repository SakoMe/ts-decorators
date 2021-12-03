import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined };
}

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

router.get('/', (request: Request, response: Response): void => {
	if (request.session?.loggedIn) {
		response.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Log Out</a>
      </div>
    `);
	} else {
		response.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Log In</a>
      </div>
    `);
	}
});

router.post('/login', (request: RequestWithBody, response: Response): void => {
	const { email, password } = request.body;
	if (
		email &&
		password &&
		email === 'bob@mail.com' &&
		password === 'password'
	) {
		request.session = { loggedIn: true };
		response.redirect('/');
	} else {
		response.status(400).send('Email or Password are incorrect');
	}
});

router.get('/logout', (request: Request, response: Response): void => {
	request.session = undefined;
	response.redirect('/');
});

router.get(
	'/protected',
	requireAuth,
	(_request: Request, response: Response) => {
		response.send(`
    <div>Welcome to protected</div>
  `);
	}
);

export { router };
