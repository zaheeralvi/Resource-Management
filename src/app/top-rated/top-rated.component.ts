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
  empty = false
  ratings: any;
  onlyRating = []
  comments: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.topRated();
  }
  topRated = async () => {
    let data = this.api.getData('sort_resources/?rating=True')
    data.subscribe((res: any) => {
      this.data = res.resources;
      for (let i = 0; i < this.data.length; i++) {
        this.comments = res.comments.filter(c => c.resource == this.data[i].id)
        this.ratings = res.ratings.filter(c => c.resource == this.data[i].id)
        let twoComment=[]
        if(this.comments.length>2){
          twoComment.push(this.comments[0])
          twoComment.push(this.comments[1])
        }else{
          twoComment=[...twoComment,this.comments]
        }
        this.data[i] = { ...this.data[i], comments: this.comments, fewComment: twoComment}
      }
      for (let i = 0; i < this.data.length; i++) {
        this.onlyRating = this.ratings.filter(r => r.rated_by != this.comments[i].commenter)
      }
      
      console.log(this.data)
      if (this.data.length == 0) {
        this.empty = true
      }
    })
  }

  getRating(rater) {
    let rate:any=this.ratings.filter(r => r.rated_by == rater)
    return rate[0].rating
  }

  saveLink = async (id) => {
    let data = this.api.getData(`save_resource?rsc_id=${id}`)
    data.subscribe((res: any) => {
      console.log(res)
      // this.data = res

    })
  }
}
