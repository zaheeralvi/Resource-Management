import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  data:any;
  empty=false
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher=async ()=>{
    let data=await this.api.getData('get_teachers/')
    data.subscribe((res:any)=>{
      console.log(res)
    })
  }
}
