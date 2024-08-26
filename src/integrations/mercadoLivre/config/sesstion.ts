import session, { SessionOptions } from 'express-session';

const sessionOptions: SessionOptions = {
  secret: 'seuSegredo',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use HTTPS em produção
    sameSite: 'strict',
    maxAge: 5 * 60 * 1000,
  },
};

export const SessionML = session(sessionOptions);
