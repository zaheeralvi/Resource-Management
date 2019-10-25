import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

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
    let data=await this.api.getData(`/navigate/?sub_id=${this.subcat}&lev_id=${this.lvl}&tpc_id=${this.topic}`)
    data.subscribe((res:any)=>{
      console.log(res)
      if(res.length==0){
        this.empty=true
      }else{
        this.data=res.filter(r=>r.resource_type==this.type)
      }
    })
  }

}
