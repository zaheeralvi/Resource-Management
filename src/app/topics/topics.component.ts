import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  query
  subcat;
  lvl;
  data:any;
  empty=false
  constructor(private route: ActivatedRoute, private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
    this.query = this.route.queryParams
    this.subcat = this.query._value.subcat
    this.lvl = this.query._value.lvl
  }

  levels = [
    {
      lev : '1',
    },
    {
      lev : '2',
    },
    {
      lev : '3',
    }

  ]

  ngOnInit() {
    this.getTopics()
  }

  async getTopics(){
    let data=await this.api.getData(`get_topic_by_sub_level/?sub_id=${this.subcat}&lev_id=${this.lvl}`)
    data.subscribe((res:any)=>{
      console.log(res)
      if(res.length==0){
        this.empty=true
      }else{
        this.data=res;
      }
    })
  }

}
