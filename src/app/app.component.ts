import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angApp';
  logged = false;
  user = null;
  @ViewChild("inputSearch") search: ElementRef;
  constructor(private http: HttpClient, private router: Router, private api: ApiService, private authService: AuthService) {
    if (localStorage.getItem('Token') != null || localStorage.getItem('Token') != undefined) {
      this.logged = true
    }
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
    console.log(this.user);
  }

  async login() {
    let res = await this.authService.doGoogleLogin();
    if (res) {
      this.logged = true
      let data = await this.api.getData('set_retrieve_role/')
      await data.subscribe((res: any) => {
        console.log('go to home')
        this.router.navigateByUrl('/categories')
      }, (err: any) => {
        this.router.navigateByUrl('/role')
        console.log('Set Profile')
      })
    }
    // await this.http.get(this.api.baseurl+'/sign_me_in?usr_id=1').subscribe((res: any) => {
    //   localStorage.setItem('Token','token '+res.Token)
    // })
  }
  logout() {
    let res = this.authService.logout();
    if (res) {
      this.logged = false
    }
  }
  searchContents() {
    if (this.search.nativeElement.value != '') {
      this.router.navigateByUrl('search?q=' + this.search.nativeElement.value)
    }
  }
}
