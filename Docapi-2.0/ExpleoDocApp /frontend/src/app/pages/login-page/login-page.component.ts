import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebRequestService} from 'src/app/web-request.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
 userName:string;
  constructor(private authService: AuthService, private router: Router, private webReqService : WebRequestService) { }

  ngOnInit() {
  }

onLoginButtonClicked(username: string, orgName: string, password: string) {
this.userName=username;
this.webReqService.sendusername(username);
console.log(this.userName);
 if(username && orgName && password){
    this.authService.login(username, orgName).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }
}

getusername() {
   return this.userName;
    }

}
