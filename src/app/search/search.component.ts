import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: any;
  data:any;
  empty=false;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
    this.query = this.route.queryParams
    this.query = this.query._value.q
    console.log('test')
  }

  ngOnInit() {
    this.getSearchResult()
  }

  async getSearchResult() {
    this.api.loader()
    const data = await this.api.getData('search/?q=' + this.query)
    data.subscribe((res:any)=>{
      console.log(res)
      this.api.noloader()
      if(res.length==0){
        this.empty=true
      }else{
        this.data=res
      }
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

  saveLink = async (id) => {
    this.api.loader();
    let data = await this.api.getData(`save_resource?rsc_id=${id}`)
    data.subscribe((res: any) => {
      console.log(res)
      if(res.resources.length==0){
        this.empty=true
      }else{
        this.empty=false
      }
      this.api.noloader()
      this.api.message(res.OK)
      // this.data = res

    })
  }

}
