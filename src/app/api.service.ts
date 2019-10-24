import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://ruangilmo.pythonanywhere.com/";
  httpHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('Token') }) }

  constructor(private http: HttpClient) { }

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
