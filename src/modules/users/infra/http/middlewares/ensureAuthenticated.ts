import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeadet = request.headers.authorization;
  if (!authHeadet) {
    throw new AppError('JWT token missing', 401);
  }
  const { secret } = authConfig.jwt;
  const [, token] = authHeadet.split(' ');

  try {
    const decoded = verify(token, secret); // aqui retorna um tipo que na exist
    // cria o tipo com uma interface
    // e força ele a ser daquele tipo
    const { sub } = decoded as TokenPayload;

    // pra isso funciona tive que sobrescrever o type Request
    request.user = {
      id: sub,
    };
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
  return next();
}
