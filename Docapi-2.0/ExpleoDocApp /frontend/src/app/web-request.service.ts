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
  private requestData;
  private user;
  readonly org;
  readonly peers;
  readonly chaincodeName;
  readonly channelName;
  public file;
  public loggeduser;
  constructor(private http: HttpClient) {
    this.queryUrl = "http://localhost:4000/query";
    this.invokeUrl = "http://localhost:4000/invoke";
    this.loginUrl = "http://localhost:4000/login";
    this.registerUrl = "http://localhost:4000/users";
    this.downloadUrl = "http://localhost:4000/download";
    this.user="nouran";
    this.org="Sales";
    this.chaincodeName="mydoc";
    this.channelName="mainchannel";
    this.peers=["peer0.Sales.sqs.com","peer0.Resorcing.sqs.com","peer0.EngagementManagement.sqs.com"];
    this.requestData='{"fcn": "GetAllDocs","peers": ["peer0.Sales.sqs.com","peer0.Resorcing.sqs.com","peer0.EngagementManagement.sqs.com"],"chaincodeName":"mydoc","channelName": "mainchannel","args": [""], "userName":"nora","orgName":"Sales"}';
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
    return this.http.post(this.queryUrl,this.requestData , { headers: new HttpHeaders({
        'Content-Type': 'application/json',
        responseType : 'text'
      })
      })
  }    

createDoc(name: string, sender: string, receiver: string, message: string, subject: string) {
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
      "args" :[name, sender, receiver, message, subject],
      "fcn" : fcn
    }, {
        observe: 'response'
       
      });
  }
  
  getSearch(name: string) {
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "QueryDocByName";
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


DeleteDoc(name: string) {
    let userName=this.user;
    let orgName=this.org;
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.channelName;
    let fcn = "DeleteDoc";
    return this.http.post(`${this.invokeUrl}`, {
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
  


}
