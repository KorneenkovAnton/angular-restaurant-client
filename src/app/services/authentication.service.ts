import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequestDto} from "../entity/authentication-request-dto";
import {Observable} from "rxjs";
import {AuthenticationResponseDto} from "../entity/authentication-response-dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL = environment.apiURL + '/resto/V1/auth';
  private LOGIN_URL = this.BASE_URL + '/login';
  private REFRESH_TOKEN_URL = this.BASE_URL + '/refresh';

  constructor(private http: HttpClient) {
  }

  login(authDto: AuthenticationRequestDto): Observable<AuthenticationResponseDto> {
    return this.http.post<AuthenticationResponseDto>(this.LOGIN_URL, authDto);
  }

  refresh(refreshToken: string): Observable<AuthenticationResponseDto> {
    const req = {
      refreshToken: refreshToken
    };
    return this.http.post<AuthenticationResponseDto>(this.REFRESH_TOKEN_URL, req);
  }
}
