import express from 'express';
import cookieSession from 'cookie-session';

import { router } from './routes/login-routes';

import { AppRouter } from './AppRouter';
import './controllers/LoginController';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['asdfasdf'] }));

app.use(router);
app.use(AppRouter.getInstance());

app.listen(3000, () => console.log('server up on 3000'));
