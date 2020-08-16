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
  id: number=1;
  docid: any;
  delId: any;
  retId:any;
  deletedID:string;
  IDfile: string;
  ngOnInit() {
  this.IDfile="newDocId.json";
  this.webReqService.Retrieve(this.IDfile).subscribe((res: any) => {
          var retId= res.body;
          this.id = parseInt(retId);
          console.log(this.id);

    });

  
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
this._snackBar.open("Successfully Uploaded Document", "Ok", {
      duration: 5000,
    });
  }
 

onCreateButtonClicked(name: string, projname: string, sender: string, receiver: string, subject: string, message: string) {
this.IDfile="newDocId.json";
let attachname=this.filename;

let stringid= this.id + "";

 if(name && projname && sender && receiver && subject && message && attachname){
    this.webReqService.createDoc(stringid, name, projname, sender, receiver, subject, message, attachname).subscribe((res: HttpResponse<any>) => {
    
      console.log("after:", this.id);
      console.log(res);
      this._snackBar.open("Successfully Created Document", "ok", {
      duration: 5000,
    });

      this.router.navigate(['/lists']);
    });
    
    this.id = this.id +1;
    stringid= this.id + "";
    var row = stringid;
    this.webReqService.Delete(this.IDfile).subscribe((res: any) => {
         console.log(JSON.stringify(res))
    });
     this.webReqService.Store(stringid, row, this.IDfile).subscribe((res: any) => {


    });
    
  }else{
   this._snackBar.open("Missing Input Parameters and/or attachment ", "ok", {
      duration: 5000,
    });
    }
    
}




}
