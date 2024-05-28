import express from 'express';
import cookieParser from 'cookie-parser';
import { SERVER_PORT } from './constants/env.constant.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});
