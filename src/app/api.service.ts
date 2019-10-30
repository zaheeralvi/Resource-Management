import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://immense-caverns-13289.herokuapp.com/";
  httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('Token') }) }
  alert = false
  loading=false;
  alertMsg = ''
  constructor(private http: HttpClient, private auth: AuthService) {
  }
  message(msg) {
    console.log(msg)
    this.alert = true
    this.alertMsg = msg;
    setTimeout(() => {
      this.alert = false
      this.alertMsg = 'msg';
    }, 2000);
  }
  loader(){
    this.loading=true
  }
  noloader(){
    this.loading=false
  }
  getallsubjects(): Observable<any> {
    return this.http.get(this.baseurl + '/admin/boardapp/subjectmodel/', this.httpHeaders)
  }

  async getData(url) {
    return this.http.get(this.baseurl + url, this.httpHeaders)
  }
  async postData(url, data) {
    return this.http.post(this.baseurl + url, data, this.httpHeaders)
  }

}
