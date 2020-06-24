import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { WebRequestService} from 'src/app/web-request.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private webReqService : WebRequestService) { }

  ngOnInit() {
  }

   onSignupButtonClicked(username: string, orgName: string) {
   this.webReqService.sendusername(username);
    this.authService.signup(username, orgName).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.router.navigate(['/lists']);
    });
  }

}
