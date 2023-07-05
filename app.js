import express from 'express';
import mongosse from 'mongoose';
import bodyParser from "body-parser";

import usersRoutes from "./routes/users.js"
import cardRoutes from "./routes/cards.js"

const { PORT = 3000 } = process.env;

mongosse.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.user = {
    _id: '64a5ddd72dadb1f181d2cd77'
  };

  next();
});

app.use('/users', usersRoutes)
app.use('/cards', cardRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})
