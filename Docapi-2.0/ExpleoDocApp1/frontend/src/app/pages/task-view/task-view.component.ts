import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { WebRequestService} from 'src/app/web-request.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/auth.service';
import { List } from 'src/app/models/list.model';
import { HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators"; 

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  documents: any;


  selectedListId: string;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,private authService: AuthService, private webReqService : WebRequestService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
    
  }

  onLogoutButtonClicked() {
    this.authService.logout();
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }
  
    Documents() {
    this.webReqService.getDocuments().subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.documents=res;
    });
  }
  
onSearchButtonClicked(name: string) {
console.log(name);
 if(name){
    this.webReqService.getSearch(name).subscribe((res: HttpResponse<any>) => {
    if(res.status === 200){
      console.log(res);
      this.router.navigate(['/lists']);}
    });
    
  }
}

}
