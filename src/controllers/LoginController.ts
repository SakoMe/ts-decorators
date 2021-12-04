import { Request, Response } from 'express';

import { get, controller, post, bodyValidator } from './decorators';

@controller('/auth')
export class LoginController {
	@get('/login')
	getLogin(_request: Request, response: Response): void {
		response.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" type="email"/>
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  
  `);
	}

	@post('/login')
	@bodyValidator('email', 'password')
	postLogin(request: Request, response: Response): void {
		const { email, password } = request.body;
		if (email === 'bob@mail.com' && password === 'password') {
			request.session = { loggedIn: true };
			response.redirect('/');
		} else {
			response.status(400).send('Email or Password are incorrect');
		}
	}

	@get('/logout')
	logout(request: Request, response: Response): void {
		request.session = undefined;
		response.redirect('/');
	}
}
