import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {catchError, filter, finalize, switchMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {AuthenticationResponseDto} from "../entity/authentication-response-dto";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes("/login") && !req.url.includes("/refresh")) {
      req = this.addAccessToken(req);
    }
    console.log("Intercept");
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 403) {
          if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAccessToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            this.refreshTokenSubject.next(null);

            return this.refreshToken().pipe(
              switchMap((authDto:AuthenticationResponseDto) => {
                localStorage.setItem("accessToken",authDto.accessToken);
                localStorage.setItem("refreshToken",authDto.refreshToken);
                this.refreshTokenSubject.next(true);
                return next.handle(this.addAccessToken(req))
              }),
              finalize(() => this.refreshTokenInProgress = false)
            );
          }
        } else {
          throwError(error);
        }
      })
    )
  }

  private refreshToken() :Observable<any>{
    return this.tokenService.refresh(localStorage.getItem("refreshToken"))
  }

  private addAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!localStorage.getItem("accessToken")) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Token_" + localStorage.getItem("accessToken"))
    });
  }
}
