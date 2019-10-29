import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
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
  loginPage = false;
  
mySubscription: any;
  @ViewChild("inputSearch") search: ElementRef;
  constructor(private http: HttpClient, private router: Router, private api: ApiService, private authService: AuthService) {
    if (localStorage.getItem('Token') != null || localStorage.getItem('Token') != undefined) {
      this.logged = true
    } else {
      this.router.navigateByUrl('/login')
    }

    if (window.location.pathname == '/login' || window.location.pathname == '/role') {
      this.loginPage = true
    } else {
      this.loginPage = false
    }

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

  }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  // async login() {
  //   let res = await this.authService.doGoogleLogin();
  //   if (res) {
  //     this.logged = true
  //     let data = await this.api.getData('set_retrieve_role/')
  //     await data.subscribe((res: any) => {
  //       console.log('go to home')
  //       this.router.navigateByUrl('/categories')
  //     }, (err: any) => {
  //       this.router.navigateByUrl('/role')
  //       console.log('Set Profile')
  //     })
  //   }
  // }


  logout() {
    let res = this.authService.logout();
    if (res) {
      this.logged = false
      window.location.href = '/login'
    }
  }
  searchContents() {
    if (this.search.nativeElement.value != '') {
      this.router.navigateByUrl('search?q=' + this.search.nativeElement.value)
    }
  }

}
