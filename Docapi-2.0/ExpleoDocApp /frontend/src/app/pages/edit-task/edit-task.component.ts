import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { WebRequestService} from 'src/app/web-request.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private webReqService : WebRequestService) { }
  EditID: string;
  userData: any;
  nextActions: any;
  id: string;
  filename: string;
  ngOnInit() {

 this.EditID=localStorage.getItem('id');
    this.getEditedDocument();
this.nextActions= localStorage.getItem('comment');
    
  }

getEditedDocument(){

this.webReqService.getSearch(this.EditID).subscribe((res: any) => {
              this.userData=res.body.result;
              this.id= JSON.stringify(this.userData.id);
});



}


OnCommentButtonClicked(comment: string){
localStorage.setItem('comment', comment);

}


}
