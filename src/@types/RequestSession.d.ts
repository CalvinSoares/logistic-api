import { Request } from 'express';
import { TypeUserToken } from './userType';

interface SessionData {
  userSession?: { email: string };
}

export type RequestSession = Request & { session: SessionData } & {
  user?: TypeUserToken;
};
