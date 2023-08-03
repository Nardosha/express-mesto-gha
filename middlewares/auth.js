import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { UNAUTHORIZED_ERROR } from '../utils/ENUMS.js';
import { JWT_SECRET } from '../config.js';

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedError(UNAUTHORIZED_ERROR);
    }

    const jwtToken = extractBearerToken(authorization);

    req.user = jwt.verify(jwtToken, JWT_SECRET);
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
