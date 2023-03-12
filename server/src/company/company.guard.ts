import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getUserFromRequest } from '../common/jwt-utils';
import { MembershipService } from './membership/membership.service';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    @Inject(MembershipService)
    private readonly membershipService: MembershipService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = getUserFromRequest(request).sub;
    const companyId = request.params.companyId;
    if (userId && companyId) {
      return this.membershipService
        .findOneByCompanyIdAndUserId(+companyId, +userId)
        .then((membership) => !!membership);
    }
    return false;
  }
}
