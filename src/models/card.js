import * as mongoose from "mongoose";
import User from "./user.js";

const userSchema = new mongoose.Schema({
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
    type: [User],
    default: [],
    required: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const Card = mongoose.model('user', userSchema);

export default Card;