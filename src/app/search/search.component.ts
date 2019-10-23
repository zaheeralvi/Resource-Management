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
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.query = this.route.queryParams
    this.query = this.query._value.q

  }

  ngOnInit() {
    this.getSearchResult()
  }

  async getSearchResult() {
    const data = await this.api.getData('http://ruangilmo.pythonanywhere.com/search/?q=' + this.query)
    data.subscribe((res:any)=>{
      console.log(res)
      this.data=res
    })
  }

}