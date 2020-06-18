import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { HttpResponse } from '@angular/common/http';
import { WebRequestService} from 'src/app/web-request.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private webReqService : WebRequestService) { }

  listId: string;
  selectedFile : string;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((newTask: Task) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

 
onCreateButtonClicked(name: string, sender: string, receiver: string, message: string, subject: string) {
 if(name && sender && receiver&& message &&subject){
    this.webReqService.createDoc(name, sender, receiver, message, subject).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }
}

}
