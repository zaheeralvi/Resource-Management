import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged = false
  constructor(private authService:AuthService,private api:ApiService,private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
  }

  async login() {
    let res = await this.authService.doGoogleLogin();
    if (res) {
      this.logged = true
      let data = await this.api.getData('set_retrieve_role/')
      data.subscribe((res: any) => {
        console.log(res)
        console.log('go to home')
        this.router.navigateByUrl('/categories')
      }, (err: any) => {
        console.log('Set Profile')
        this.toastr.warning('Set your Role')
        console.log(err)
        this.router.navigateByUrl('/role')
      })
    }
  }

}

