import { Request, Response } from 'express';

import { get, controller } from './decorators';

@controller('/auth')
class LoginController {
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
}
