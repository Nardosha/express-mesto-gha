const corsOptions = {
  origin: [
    'http://purple.unicorn.nomoreparties.co',
    'https://purple.unicorn.nomoreparties.co',
    'http://localhost:3000',
  ],
  credentials: true,
  maxAge: 36,
};

export default corsOptions;