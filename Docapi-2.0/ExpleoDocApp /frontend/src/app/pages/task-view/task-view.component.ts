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
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
    providers: [ MatSnackBar]
})
export class TaskViewComponent implements OnInit{
  
  constructor( private route: ActivatedRoute, private router: Router,private authService: AuthService, private webReqService : WebRequestService, private _snackBar: MatSnackBar) { }
 
  orgname: string;
  username: string;
  userData:any;
  Sales: string;
  sales: string;
  search : boolean = false;
  filename: string;
  archive: boolean=false;
  closed : boolean = false;
  closurereason: string;

  displayedColumns: string[] = ['id','clientname','projectname','attachment','actions'];
  dataSource;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
  this.Sales="Sales";
  this.sales="sales";
  this.username=localStorage.getItem('username');
  this.orgname=localStorage.getItem('orgname');
   this.Documents();
       this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;


  }
  
  
  applyFilter(filterValue: string){
  filterValue=filterValue.trim();
  filterValue=filterValue.toLowerCase();
  this.dataSource.filter=filterValue;
  
  }

onArchivedButtonClicked(id:string, closurereason:string) {
this.closed=true;
 this.webReqService.sharedData=closurereason; 
 this.closurereason=closurereason;
 if(closurereason){
    this.getRecord(this.webReqService.dataRow);
    this.router.navigate(['/lists/signup']);
    }else{
    this._snackBar.open("Missing Closure Reason", "Ok", {
      duration: 5000,
    });
    
    }

}

onEditButtonClicked(id: string){
var editid="id";
localStorage.setItem(editid,id);
this.webReqService.sharedEditID=id;
}


getRecord(row : any){
    console.log(row);
     this.webReqService.dataRow = row;

     let closure= {
  "closurereason": this.closurereason
};
     let newrow= Object.assign(row.Record, closure);
     alert(JSON.stringify(newrow));
     this.filename="Archived.json";
     if(this.closurereason){
     this.webReqService.Store(row, this.filename).subscribe((res: any) => {
              this.userData=res;

    });
    
     this._snackBar.open("Successfully Archived Document", "Ok", {
      duration: 5000,
    }); 
    
    }
     
    
    
    
  }  

   onDeleteButtonClicked(id: string) {
     this.webReqService.DeleteDoc(id).subscribe((res: any) => {
    
     this.router.navigate(['/lists/']);
    });
  }
  
   onLogoutButtonClicked() {
    this.authService.logout();
   }

   Documents() { 
    this.webReqService.getDocuments().subscribe((res: any) => {
              this.userData=res.body.result;
              this.dataSource= new MatTableDataSource<PeriodicElement>(res.body.result);


});
                                
  }

onDownloadButtonClicked(name:string) {
           this.webReqService.downloadFile(name)
        .subscribe(
            data => saveAs(data, name),
            error => console.error(error)
        );
}


}
