import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getUserFromRequest } from '../common/jwt-utils';

@Injectable()
export class CompanyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = getUserFromRequest(request);
    const companyId = request.params.companyId;
    if (user && companyId) {
      return user.companiesRoles?.[companyId] !== undefined;
    }
    return false;
  }
}
