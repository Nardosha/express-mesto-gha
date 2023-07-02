import express from 'express';
import mongosse from 'mongoose';

const { PORT = 3000 } = process.env;

const app = express();
mongosse.connect('mongodb://localhost:27017/mestodb');


app.listen(PORT, () => {
  console.log(`Server startes on port: ${PORT}`)
})

