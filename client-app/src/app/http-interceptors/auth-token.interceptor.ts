import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthTokenHttpInterceptor implements HttpInterceptor {

    constructor(
        private auth: AngularFireAuth
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.idToken.pipe(
            take(1),
            switchMap(idToken => {
                let clone = req.clone()
                if (idToken) {
                    clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
                }
                return next.handle(clone)
            })
        )

    }
}

export const AuthTokenHttpInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenHttpInterceptor,
    multi: true
}