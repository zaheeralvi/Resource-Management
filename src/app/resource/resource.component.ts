import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';
import { StarRatingComponent } from 'ng-starrating';

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
  empty = false;
  data: any;
  comments: any;
  ratings: any;
  grid = false;
  list = true;
  rating=5;
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

  async getResources() {
    let data = await this.api.getData(`navigate/?sub_id=${this.subcat}&lev_id=${this.lvl}&tpc_id=${this.topic}`)
    data.subscribe((res: any) => {
      this.data = res.resources.filter((r: any) => r.resource_type == this.type)
      for (let i = 0; i < this.data.length; i++) {
        let comments = res.comments.filter(c => c.resource == this.data[i].id)
        let ratings = res.ratings.filter(c => c.resource == this.data[i].id)
        this.data[i] = { ...this.data[i], comments: comments, ratings: ratings }
      }
      console.log(this.data)
      if (this.data.length == 0) {
        this.empty = true
      }
    })
  }

  followAuther = async (auther) => {
    let data = await this.api.getData('follow_author/?aut_id=1')
    data.subscribe((res: any) => {
      console.log(res)
    })
  }

  layoutChange(n) {
    if (n == 1) {
      this.grid = true
      this.list = false
    } else {
      this.grid = false
      this.list = true
    }
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rating = $event.newValue
  }

}
