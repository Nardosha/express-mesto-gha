const getUser = (req, res, next) => {
  req.user = {
    _id: '64a18a39e1ccf7087dda39f3'
  };

  next();
}

export {
  getUser
}