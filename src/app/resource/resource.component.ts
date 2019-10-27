import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  query
  subcat;
  lvl;
  topic;
  type;
  empty=false;
  data:any;
  grid=false;
  list=true;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.query = this.route.queryParams
    this.subcat = this.query._value.subcat
    this.lvl = this.query._value.lvl
    this.topic = this.query._value.topic
    this.type = this.query._value.type
  }

  ngOnInit() {
    this.getResources()
  }

  async getResources(){
    let data=await this.api.getData(`navigate/?sub_id=${this.subcat}&lev_id=${this.lvl}&tpc_id=${this.topic}`)
    data.subscribe((res:any)=>{
      console.log(res)
      if(res.length==0){
        this.empty=true
      }else{
        this.data=res.filter(r=>r.resource_type==this.type)
      }
    })
  }

  followAuther=async (auther)=>{
    let data= await this.api.getData('follow_author/?aut_id=1')
    data.subscribe((res:any)=>{
      console.log(res)
    })
  }

  layoutChange(n){
    if(n==1){
      this.grid=true
      this.list=false
    }else{
      this.grid=false
      this.list=true
    }
  }

}
