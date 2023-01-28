import { UnauthorizedException } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { RequestContext } from 'nestjs-request-context';

function getUserId(jwtPayload): number {
  if (jwtPayload) {
    return +decode(jwtPayload).sub;
  }
  return null;
}

export function getJwtUserId(): number {
  const req = RequestContext.currentContext?.req;
  // try to get the user from the jwt cookie
  if (req && req.cookies) {
    const jwt = req.cookies['jwt'];
    if (jwt) {
      return getUserId(jwt);
    } // try to get the user from the request header bearer token
    else if (req && req.headers && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        const jwt = authHeader.substring(7);
        return getUserId(jwt);
      }
    }
  }
  throw new UnauthorizedException();
}
