import {Role} from "./role.enum";

export class AuthenticationResponseDto {
  accessToken:string;
  refreshToken:string;
  role:string;
}
