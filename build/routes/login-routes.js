"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
function requireAuth(request, response, next) {
    if (request.session?.loggedIn) {
        next();
        return;
    }
    else {
        response.status(403).send('Not authorized');
    }
}
router.get('/', (request, response) => {
    if (request.session?.loggedIn) {
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
router.get('/protected', requireAuth, (_request, response) => {
    response.send(`
    <div>Welcome to protected</div>
  `);
});
