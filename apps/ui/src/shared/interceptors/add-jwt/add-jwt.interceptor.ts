import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.local';
import { inject } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { mergeMap, switchMap } from 'rxjs';

export const addJwtInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes(environment.bffUrl)) {
    return next(req);
  }
  const auth = inject(AuthService);
  return auth.user$.pipe(
    switchMap((user) => {
      return user!.getIdToken();
    }),
    mergeMap((token) => {
      return next(
        req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      );
    })
  );
};
