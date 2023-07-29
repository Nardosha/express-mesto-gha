import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const {authorization} = req.headers

  if (!(authorization || authorization.startWith('Bearer '))) {
    throw new Error('Необходима авторизация')
  }

  const token = authorization.replace('Bearer ', '')
  let payload;
  try {
    payload = jwt.verify(token, 'shrek')
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload
  console.log(req.user)
  next()
}

