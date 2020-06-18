import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  readonly queryUrl;
  readonly invokeUrl;
  readonly loginUrl;
  readonly registerUrl;
  private requestData;
  private user;
  readonly org;
  readonly peers;
  readonly chaincodeName;
  readonly channelName;


  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
    this.queryUrl = "http://localhost:4000/query";
    this.invokeUrl = "http://localhost:4000/invoke";
    this.loginUrl = "http://localhost:4000/login";
    this.registerUrl = "http://localhost:4000/users";
    this.user="nouran";
    this.org="Sales";
    this.chaincodeName="mydoc";
    this.channelName="mainchannel";
    this.peers=["peer0.Sales.sqs.com","peer0.Resorcing.sqs.com","peer0.EngagementManagement.sqs.com"];
    this.requestData='{"fcn": "GetAllDocs","peers": ["peer0.Sales.sqs.com","peer0.Resorcing.sqs.com","peer0.EngagementManagement.sqs.com"],"chaincodeName":"mydoc","channelName": "mainchannel","args": [""], "userName":"nora","orgName":"Sales"}';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
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
        'Content-Type': 'application/json'
      })
      })
  }    

createDoc(name: string, sender: string, receiver: string, message: string, subject: string) {
    let userName=this.user;
    let orgName=this.org;
    let fcn = "InitDoc";
    let peers=this.peers;
    let chaincodeName=this.chaincodeName;
    let channelName=this.chaincodeName;
    return this.http.post(`${this.invokeUrl}`, {
      userName,
      orgName,
      name,
      peers,
      channelName,
      chaincodeName,
      sender,
      receiver,
      message,
      subject,
      fcn
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
      userName,
      orgName,
      peers,
      channelName,
      chaincodeName,
      name,
      fcn
    }, {
        observe: 'response'
      });
  }




}
