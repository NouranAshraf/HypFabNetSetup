import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebRequestService} from 'src/app/web-request.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ MatSnackBar]

})
export class LoginPageComponent implements OnInit {
 userName:string;
 engmanag:string;

   constructor(private authService: AuthService, private router: Router, private webReqService : WebRequestService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

onLoginButtonClicked(username: string, orgName: string) {

if(!orgName){
 this._snackBar.open("Missing username and/or department name", "ok", {
      duration: 5000,
    });
}
var name="username";
var orgname="orgname";
localStorage.setItem(name, username);
localStorage.setItem(orgname, orgName);
this.webReqService.sharedUsername=username;
this.webReqService.sharedOrgname=orgName;

console.log(this.userName);
orgName= orgName[0].toUpperCase()+ orgName.slice(1);

if(orgName=="Engagement Management" || orgName=="Engagementmanagement" || orgName=="Engagement management"){
 orgName= orgName.replace(/\s/g, "");
 this.engmanag="Engagement"+ orgName[10].toUpperCase() +orgName.slice(11);
 orgName=this.engmanag;
}



if(orgName=="Sales" || orgName=="Resourcing" || orgName=="EngagementManagement" || orgName=="Client"){

 if(username && orgName){
    this.authService.login(username, orgName).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }else{
  this._snackBar.open("Please provide your username", "ok", {
      duration: 5000,
    });
  }
  }else{
   this._snackBar.open("Please choose your department : Sales, Resourcing, EngagementManagement", "ok", {
      duration: 5000,
    });
  }
}

getusername() {
   return this.userName;
    }

}
