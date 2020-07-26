import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly queryUrl;
  readonly invokeUrl;
  readonly loginUrl;
  readonly registerUrl;
  readonly downloadUrl;
  readonly storeUrl;
  readonly retrieveUrl;
  private requestData;
  private user;
  readonly org;
  readonly peers;
  readonly chaincodeName;
  readonly channelName;
  public file;
  public loggeduser;
   dataRow:any;
  sharedData: string;
  sharedUsername: string;
  sharedOrgname: string;
  sharedEditID: string;
  constructor(private http: HttpClient) {
    this.queryUrl = "http://localhost:4000/query";
    this.invokeUrl = "http://localhost:4000/invoke";
    this.loginUrl = "http://localhost:4000/login";
    this.registerUrl = "http://localhost:4000/users";
    this.downloadUrl = "http://localhost:4000/download";
    this.storeUrl = "http://localhost:4000/store";
    this.retrieveUrl= "http://localhost:4000/retrieve";
    this.user="nouran";
    this.org="Sales";
    this.chaincodeName="mydoc";
    this.channelName="mainchannel";
    this.peers=["peer0.Sales.sqs.com","peer0.Resorcing.sqs.com","peer0.EngagementManagement.sqs.com"];
 
  }



  login(username: string, orgName: string) {
    return this.http.post(`${this.loginUrl}`, {
      username,
      orgName
    }, {
        observe: 'response'
      });
  }
  


  signup(username: string, orgName: string) {
    return this.http.post(`${this.registerUrl}`, {
      username,
      orgName
    }, {
        observe: 'response'
      });
  }
  
getDocuments(){
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "GetAllDocs";
    return this.http.post(`${this.queryUrl}`, {
      "userName" : userName,
      "orgName" : orgName,
      "peers" : peers,
      "channelName" : channelName,
      "chaincodeName" : chaincodeName,
      "args" :[""],
      "fcn" : fcn
    }, {
        observe: 'response'
      });
  }    

createDoc(id: string, name: string, projname: string, sender: string, receiver: string, subject: string, message: string, attachname: string) {
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "InitDoc";
    return this.http.post(`${this.invokeUrl}`, {
      "userName" : userName,
      "orgName" : orgName,
      "peers" : peers,
      "channelName" : channelName,
      "chaincodeName" : chaincodeName,
      "args" :[id, name, projname, sender, receiver, subject, message, attachname],
      "fcn" : fcn
    }, {
        observe: 'response'
       
      });
  }
  
  getSearch(ID: string) {
   if(ID || ID == "0" || !(ID="undefined")){
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "QueryDocByID";
    return this.http.post(`${this.queryUrl}`, {
      "userName" : userName,
      "orgName" : orgName,
      "peers" : peers,
      "channelName" : channelName,
      "chaincodeName" : chaincodeName,
      "args" :[ID],
      "fcn" : fcn
    }, {
        observe: 'response'
      });
   }else{
    alert("id is empty");
      
        } 
  }


DeleteDoc(id: string) {
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "DeleteDoc";
    alert(id);
    return this.http.post(`${this.invokeUrl}`, {
      "userName" : userName,
      "orgName" : orgName,
      "peers" : peers,
      "channelName" : channelName,
      "chaincodeName" : chaincodeName,
      "args" :[id],
      "fcn" : fcn
    }, {
        observe: 'response'
      });
  }

  DocValueHistory(name: string) {
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "DocValueHistory";
    return this.http.post(`${this.queryUrl}`, {
      "userName" : userName,
      "orgName" : orgName,
      "peers" : peers,
      "channelName" : channelName,
      "chaincodeName" : chaincodeName,
      "args" :[name],
      "fcn" : fcn
    }, {
        observe: 'response'
      });
  }
 
 downloadFile(file:String){
  var body = {filename: file};
        return this.http.post('http://localhost:4000/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
  }
  
  sendmessage(filename: string){
   this.file=filename;
  
  }
  
   sendusername(username: string){
   this.loggeduser=username;
  
  }
  
  
  Store(row : string, filename: string) {
    return this.http.post(`${this.storeUrl}`, {

      "row" : row,
      "filename" : filename
    }, {
        observe: 'response'
      });
  }
  
  Retrieve(filename: string) {
   return this.http.post(`${this.retrieveUrl}`, {

      "filename" : filename
    }, {
        observe: 'response'
      });
  
  
  }
 


}
