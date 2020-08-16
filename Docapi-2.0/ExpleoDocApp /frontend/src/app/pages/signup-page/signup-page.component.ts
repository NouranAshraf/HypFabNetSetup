import { Component, OnInit } from '@angular/core';
import { WebRequestService} from 'src/app/web-request.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/auth.service';
import { List } from 'src/app/models/list.model';
import { HttpResponse } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import {saveAs} from 'file-saver';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { MessageComponent} from 'src/app/pages/message/message.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';

export interface PeriodicElement {
  id: string;
  clientname: string;
  projectname: string;
  sender: string;
  receiver: string;
  description: string;
  comments: string;
  attachment: string;
}


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
    providers: [ MatSnackBar]
})
export class SignupPageComponent implements OnInit {
  constructor( private route: ActivatedRoute, private router: Router,private authService: AuthService, private webReqService : WebRequestService, private _snackBar: MatSnackBar) { }
  userData:any;
  valueData:any;
  retrievedData:any;
  dataRow: any;
  archived= [];
  closurereason:string;
  filename: string;
  show: boolean = false;
  searchText : boolean = false;
  filterrow: any;


  displayedColumns: string[] = ['id','clientname','projectname','sender','receiver','description','comments','attachment','closurereason','actions'];
  dataSource;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
  this.closurereason=this.webReqService.sharedData;
   this.Documents();
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
  }

  
  applyFilter(filterValue: string){
   this.filename="Archived.json";
   this.webReqService.Retrieve(this.filename).subscribe((res: any) => {
              this.userData=res.body;   
 for(var i = 0; i < this.userData.length; i++){           
   if(filterValue){
   
   if(res.body[i].Record.id.includes(filterValue) || res.body[i].Record.name.includes(filterValue) || res.body[i].Record.projname.includes(filterValue) || res.body[i].Record.attachname.includes(filterValue) || res.body[i].Record.sender.includes(filterValue) || res.body[i].Record.receiver.includes(filterValue) || res.body[i].Record.subject.includes(filterValue) || res.body[i].Record.msg.includes(filterValue) || res.body[i].Record.closurereason.includes(filterValue)){
     this.filterrow= res.body[i];
     this.filename="searchItems.json";
  this.webReqService.Store(res.body[i].Record.id, this.filterrow, this.filename).subscribe((res: any) => {
    });

  this.webReqService.Retrieve(this.filename).subscribe((res: any) => {
          this.dataSource= res.body;
          console.log(JSON.stringify(this.dataSource));
    });

  } // second if end 
}// first if end 

 } //for loop end  
 
});
  }


  removeSearchField(filterValue: string) {
  this.filename="searchItems.json";  
  this.webReqService.Delete(this.filename).subscribe((res: any) => {
         console.log(JSON.stringify(res))
    });
  }
  
   clearSearchField() {
   location.reload();
  }

   onDocHistoryButtonClicked(id: string) {
    this.webReqService.DocValueHistory(id).subscribe((res: any) => {
              this.userData=res.body.result;

              
        


});
    }
  
 Documents() {
           this.dataRow = this.webReqService.dataRow;
           this.filename="Archived.json";
          this.webReqService.Retrieve(this.filename).subscribe((res: any) => {
          console.log(res);    
          this.dataSource= new MatTableDataSource<PeriodicElement>(res.body);
          
              
    });


                                
  }
  
 onBackButtonClicked(){
 location.reload();
 
 } 

onDownloadButtonClicked(name:string) {
           this.webReqService.downloadFile(name)
        .subscribe(
            data => saveAs(data, name),
            
            error => console.error(error)

        );
  
        
}


}
