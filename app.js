import express from 'express';
import mongosse from 'mongoose';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { errors } from 'celebrate';
import { PORT, DB_CONNECTION } from './config.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import NotFoundError from './errors/NotFoundError.js';
import errorHandler from './middlewares/errorHandler.js';
import auth from './middlewares/auth.js';
import usersRoutes from './routes/users.js';
import cardRoutes from './routes/cards.js';
import { validateLogin, validateUserData } from './utils/validationHelper.js';
import corsOptions from "./utils/corsOptions.js";
import { createUser, login } from './controllers/users.js';
import { NOT_FOUND_PAGE_ERROR } from './utils/ENUMS.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(cookieParser());

app.use(cors(corsOptions));

mongosse.connect(DB_CONNECTION);

app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signup', validateLogin, validateUserData, createUser);
app.use('/signin', validateLogin, login);
app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERROR));
});

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
