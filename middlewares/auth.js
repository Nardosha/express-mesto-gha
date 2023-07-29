import jwt from "jsonwebtoken";

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

const handleAuthException = (res) => {
  res.status(401).send({message: 'Необходима авторизация'});
}

export const auth = (req, res, next) => {
  try {
    const {authorization} = req.headers

    if (!authorization || !authorization?.startsWith('Bearer ')) {
      handleAuthException(res)
    }

    const token = extractBearerToken(authorization)

    req.user = jwt.verify(token, 'shrek')
    next()
  } catch (err) {
    return res.status(500).send({message: err.message});
  }
}

