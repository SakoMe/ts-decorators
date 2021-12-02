"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
function requireAuth(request, response, next) {
    var _a;
    if ((_a = request.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        next();
        return;
    }
    else {
        response.status(403).send('Not authorized');
    }
}
router.get('/', (request, response) => {
    var _a;
    if ((_a = request.session) === null || _a === void 0 ? void 0 : _a.loggedIn) {
        response.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Log Out</a>
      </div>
    `);
    }
    else {
        response.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Log In</a>
      </div>
    `);
    }
});
router.get('/login', (_request, response) => {
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
});
router.post('/login', (request, response) => {
    const { email, password } = request.body;
    if (email &&
        password &&
        email === 'bob@mail.com' &&
        password === 'password') {
        request.session = { loggedIn: true };
        response.redirect('/');
    }
    else {
        response.status(400).send('Email or Password are incorrect');
    }
});
router.get('/logout', (request, response) => {
    request.session = undefined;
    response.redirect('/');
});
router.get('/protected', requireAuth, (request, response) => {
    response.send(`
    <div>Welcome to protected</div>
  `);
});
