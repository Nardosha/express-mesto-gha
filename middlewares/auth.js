import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import {UNAUTHORIZED_ERROR} from "../utils/ENUMS.js";

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

export const auth = (req, res, next) => {
  try {
    const {authorization} = req.headers

    if (!authorization || !authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR)
    }

    const token = extractBearerToken(authorization)

    req.user = jwt.verify(token, 'shrek')
    next()
  } catch (err) {
    next(err)
  }
}

