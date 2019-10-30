import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/#/login'
    } 
   }

  ngOnInit() {
  }

  setRole = async (role) => {
    let data = await this.api.postData('set_retrieve_role/', { 'role': role })
    data.subscribe((res: any) => {
      console.log(res)
      window.location.href = '/categories'
    }, (err: any) => {
      console.log(err.error.Error)
      window.location.href = '/categories'
    })
  }

}
