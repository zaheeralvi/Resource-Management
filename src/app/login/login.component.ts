import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged = false
  constructor(private authService: AuthService, private api: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  async login() {
    let res = await this.authService.doGoogleLogin();
    if (res) {
      this.logged = true
      let httpHeaders = { headers: new HttpHeaders({ 'Authorization': localStorage.getItem('Token') }) }
      this.http.get(this.api.baseurl + 'set_retrieve_role/', httpHeaders).subscribe((result: any) => {
        console.log(result)
        if (result.role!=undefined){
          window.location.href='/categories'
        }else{
          window.location.href='/role'
        }
      },(err:any)=>{
        window.location.href='/role'
      })
    }
  }
}

