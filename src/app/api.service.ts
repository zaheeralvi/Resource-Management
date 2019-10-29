import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://immense-caverns-13289.herokuapp.com/";
  httpHeaders:any;
  
  constructor(private http: HttpClient, private auth:AuthService) { 
  }

  ngOnInit() {
    this.httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.auth.getToken() }) }
  }

  getallsubjects(): Observable<any> {
    return this.http.get(this.baseurl + '/admin/boardapp/subjectmodel/', this.httpHeaders)
  }

  getData(url) {
    return this.http.get(this.baseurl + url, this.httpHeaders)
  }
  postData(url,data) {
    return this.http.post(this.baseurl + url,data, this.httpHeaders)
  }

}
