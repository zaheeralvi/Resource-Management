import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  data: any;
  empty = false
  teacher_id;
  constructor(private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/#/login'
    } 
   }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher = async () => {
    let data = await this.api.getData('follow_author/')
    data.subscribe((res: any) => {
      console.log(res)
      this.teacher_id=res.followed.user
      if (res.usernames.hasOwnProperty(1)) {
        var value = res.usernames[1];
        this.data = value
      }
    })
  }

  followAuther = async (auther) => {
    let data = await this.api.getData('follow_author/?aut_id=' + auther)
    data.subscribe((res: any) => {
      console.log(res)
    })
  }
}
