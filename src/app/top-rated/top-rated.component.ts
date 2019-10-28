import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {

  data: any;
  empty=false
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.topRated();
  }
  topRated = async () => {
    let data = this.api.getData('sort_resources/?rating=True')
    data.subscribe((res: any) => {
      this.data = res.resources;
      for (let i = 0; i < this.data.length; i++) {
        let comments=res.comments.filter(c=>c.resource==this.data[i].id)
        let ratings=res.ratings.filter(c=>c.resource==this.data[i].id)
        this.data[i]={...this.data[i],comments:comments,ratings:ratings}
      }
      console.log(this.data)
      if (this.data.length == 0) {
        this.empty = true
      }
    })
  }

  saveLink = async (id) => {
    let data = this.api.getData(`save_resource?rsc_id=${id}`)
    data.subscribe((res: any) => {
      console.log(res)
      // this.data = res

    })
  }
}
