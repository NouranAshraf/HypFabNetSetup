import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { HttpResponse } from '@angular/common/http';
import { WebRequestService} from 'src/app/web-request.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
 
 file: File= null;
 filename: any;

  constructor( private route: ActivatedRoute, private router: Router, private webReqService : WebRequestService, private http: HttpClient) { }

  listId: string;
  selectedFile : string;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

 
onCreateButtonClicked(name: string, sender: string, receiver: string, message: string, subject: string) {
 if(name && sender && receiver && message && subject){
    this.webReqService.createDoc(name, sender, receiver, message, subject).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }
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

  }

}
