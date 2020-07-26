import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { HttpResponse } from '@angular/common/http';
import { WebRequestService} from 'src/app/web-request.service';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  providers: [ MatSnackBar]
})
export class NewTaskComponent implements OnInit {
 
 file: File= null;
 filename: any;

  constructor( private route: ActivatedRoute, private router: Router, private webReqService : WebRequestService, private http: HttpClient, private _snackBar: MatSnackBar) { }

  listId: string;
  selectedFile : string;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

 
 onFileChanged(event) {
    this.file = event.target.files[0];
    this.filename = this.file.name;
    this.webReqService.sendmessage(this.filename)
     const uploadData = new FormData();
  uploadData.append('', this.file, this.filename);
     this.http.post('http://localhost:4000/upload', uploadData, {
    reportProgress: true,
    observe: 'events'
  })
    .subscribe(event => {
      console.log(event);
    });
this._snackBar.open("Successfully Uploaded Document", "ok", {
      duration: 5000,
    });
  }
 
 Onidclick(){
  this._snackBar.open("Document id must be an integer number : 0, 15,43, 84 ", "ok", {
      duration: 5000,
    });
 }
onCreateButtonClicked(id: string, name: string, projname: string, sender: string, receiver: string, subject: string, message: string) {
let attachname=this.filename;

 if(id && name && projname && sender && receiver && subject && message && attachname){
    this.webReqService.createDoc(id, name, projname, sender, receiver, subject, message, attachname).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this._snackBar.open("Successfully Created Document", "ok", {
      duration: 5000,
    });
      this.router.navigate(['/lists']);}
    });
    
  }else{
   this._snackBar.open("Missing Input Parameters and/or attachment ", "ok", {
      duration: 5000,
    });
    }
}




}
