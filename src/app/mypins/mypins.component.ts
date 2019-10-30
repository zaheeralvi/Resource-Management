import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mypins',
  templateUrl: './mypins.component.html',
  styleUrls: ['./mypins.component.css']
})
export class MypinsComponent implements OnInit {

  data:any
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.getPins()
  }

  getPins=async ()=>{
    this.api.loader()
    let data=await this.api.getData('save_resource/')
    data.subscribe((res:any)=>{
      console.log(res)
      this.api.noloader()
      this.data=res;
    })
  }

}
