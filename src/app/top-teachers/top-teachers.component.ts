import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-top-teachers',
  templateUrl: './top-teachers.component.html',
  styleUrls: ['./top-teachers.component.css']
})
export class TopTeachersComponent implements OnInit {

  data: any;
  empty = false
  constructor(private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
   }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher = async () => {
    this.api.loader()
    let data = await this.api.getData('most_followed/')
    data.subscribe((res: any) => {
      console.log(res)
      this.api.noloader()
      this.data=res.usernames
    })
  }

  followAuther = async (auther) => {
    this.api.loader()
    let data = await this.api.getData('follow_author/?aut_id=' + auther)
    data.subscribe((res: any) => {
      console.log(res)
      this.api.noloader()
      this.api.message(res.OK)
    })
  }

}
