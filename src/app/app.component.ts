import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angApp';
  @ViewChild("inputSearch") search: ElementRef;
  constructor(private http: HttpClient, private router: Router,private api:ApiService) {
    this.login()
  }

  ngOnInit() {

  }

  async login() {
    await this.http.get(this.api.baseurl+'/sign_me_in?usr_id=1').subscribe((res: any) => {
      localStorage.setItem('Token','token '+res.Token)
    })
  }

  searchContents() {
    this.router.navigateByUrl('/search?q=' + this.search.nativeElement.value)
  }
}
