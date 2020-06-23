import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { WebRequestService} from 'src/app/web-request.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private webReqService : WebRequestService) { }

  taskId: string;
  listId: string;

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params.taskId;
        this.listId = params.listId;
      }
    )
  }

  onSaveButtonClicked(name: string, sender: string, receiver: string, message: string, subject: string) {
 if(name && sender && receiver&& message &&subject){
    this.webReqService.createDoc(name, sender, receiver, message, subject).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }
}


}
