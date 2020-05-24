import {Component, OnInit} from "@angular/core";
import {AuthenticationRequestDto} from "../../entity/authentication-request-dto";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:AuthenticationRequestDto = {
    username:'',
    password:''
  };

  constructor( private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.model).subscribe(
      res=>{
        localStorage.setItem("accessToken",res.accessToken);
        localStorage.setItem("refreshToken",res.refreshToken);
        location.replace("/orders");
      },
      err=>{
        alert("Error");
      }
    );
  }
}
