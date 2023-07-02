import mongoose from "mongoose";
import { userSchema } from "./user.js";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link:{
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    default: [],
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const Card = mongoose.model('card', cardSchema);

export default Card;