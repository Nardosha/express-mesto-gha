import {celebrate, Joi} from "celebrate";
import * as mongoose from "mongoose";
import {INCORRECT_ID_ERROR} from "./ENUMS.js";

const URL_PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
})


export const validateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_PATTERN),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true)
})

export const validateUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.number().required().custom((id, helpers) => {
      if (!mongoose.Schema.Types.ObjectId.isValid(id)) {
        return helpers.message(INCORRECT_ID_ERROR)
      }
      return id
    })
  }).unknown(true)
})

export const validateUserUrl = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL_PATTERN)
  })
})