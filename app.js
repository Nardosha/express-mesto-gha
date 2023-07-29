import express from 'express';
import mongosse from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import usersRoutes from "./routes/users.js";
import cardRoutes from "./routes/cards.js";
import {NOT_FOUND_PAGE_ERROR} from "./utils/ENUMS.js";
import {errors} from "celebrate";
import NotFoundError from "./errors/NotFoundError.js";

dotenv.config();

const { PORT = 3000 } = process.env;

mongosse.connect("mongodb://localhost:27017/mestodb")

const app = express();

app.use(bodyParser.json())

app.use('/users', usersRoutes)
app.use('/cards', cardRoutes)

app.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERROR))
});

app.use(errors())

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
