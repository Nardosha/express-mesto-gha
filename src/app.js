import express from 'express';
import mongosse from 'mongoose';
import bodyParser from "body-parser";

import usersRouter from "./routes/users.js"
import {getUser} from "./middlewares/getUser.js";

const { PORT = 3000 } = process.env;

mongosse.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json())

app.use(getUser)

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
