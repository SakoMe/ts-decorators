import express from 'express';
import cookieSession from 'cookie-session';
import { router } from './routes/login-routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['asdfasdf'] }));

app.use(router);

app.listen(3000, () => console.log('server up on 3000'));
