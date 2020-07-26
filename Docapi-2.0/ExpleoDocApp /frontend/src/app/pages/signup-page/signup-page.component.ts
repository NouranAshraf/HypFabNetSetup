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
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
    providers: [ MatSnackBar]
})
export class SignupPageComponent implements OnInit {
  constructor( private route: ActivatedRoute, private router: Router,private authService: AuthService, private webReqService : WebRequestService, private _snackBar: MatSnackBar) { }
 


  userData:any;
  retrievedData:any;
  dataRow: any;
  archived= [];
  closurereason:string;
  filename: string;


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
  filterValue=filterValue.trim();
  filterValue=filterValue.toLowerCase();
  this.dataSource.filter=filterValue;
  
  }

   onDeleteButtonClicked(id: string) {
     this.webReqService.DeleteDoc(id).subscribe((res: any) => {
         this._snackBar.open("Successfully Deleted Document", "Ok", {
      duration: 5000,
    });
         this.router.navigate(['/lists/signup']);
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

onDownloadButtonClicked(name:string) {
           this.webReqService.downloadFile(name)
        .subscribe(
            data => saveAs(data, name),
            
            error => console.error(error)

        );
  
        
}


}
