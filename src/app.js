import express from 'express';
import mongosse from 'mongoose';
import router from "./routes/routes.js"

const { PORT = 3000 } = process.env;

mongosse.connect('mongodb://localhost:27017/mestodb');
const app = express();

app.use('/users', router)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})

