import { Component, OnInit } from '@angular/core';
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
  constructor( private route: ActivatedRoute, private router: Router,private authService: AuthService, private webReqService : WebRequestService) { }
  
  documents: any;
  username: string;
  userData:any;
 show : boolean = false;
 search : boolean = false;

  selectedListId: string;

  ngOnInit() {
   this.Documents();
 
    
  }
  
   onDeleteButtonClicked(name: string) {
     this.webReqService.DeleteDoc(name).subscribe((res: any) => {
     alert("Successfully Deleted Document" +" " + name +" "+ "Press update documents")
     this.router.navigate(['/lists']);
    });
  }
  
  onLogoutButtonClicked() {
    this.authService.logout();
  }

    Documents() {
    this.webReqService.getDocuments().subscribe((res: any) => {
              this.userData=res.result;
              

});
                                
  }
  
  onDocHistoryButtonClicked(name: string) {
    this.webReqService.DocValueHistory(name).subscribe((res: any) => {
              this.userData=res.body.result;

});
                 
}
  
onSearchButtonClicked(name: string) {
 this.webReqService.getSearch(name).subscribe((res: any) => {
              this.userData=res.body.result;
              });
}




}
