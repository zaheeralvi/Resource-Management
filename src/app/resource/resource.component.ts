import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';
import { StarRatingComponent } from 'ng-starrating';
import { Validators, FormBuilder } from '@angular/forms';

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
  onlyRating = []
  list = true;
  rate = 0;
  modal=false;
  modelData:any;
  rateCommentForm:any;
  constructor(private route: ActivatedRoute, private api: ApiService,private fb:FormBuilder) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/#/login'
    } 
    this.query = this.route.queryParams
    this.subcat = this.query._value.subcat
    this.lvl = this.query._value.lvl
    this.topic = this.query._value.topic
    this.type = this.query._value.type
  }

  ngOnInit() {
    this.getResources()
    this.rateCommentForm=this.fb.group({
      comment: ['',[Validators.required]],
    })
  }

  resourceDetails(resource){
    console.log(resource)
    this.modelData=resource
    this.modal=true
  }
  hideModal(){
    this.modal=false
  }

  async getResources() {
    let data = await this.api.getData(`navigate/?sub_id=${this.subcat}&lev_id=${this.lvl}&tpc_id=${this.topic}`)
    data.subscribe((res: any) => {
      this.data = res.resources.filter((r: any) => r.resource_type == this.type)
      for (let i = 0; i < this.data.length; i++) {
        this.comments = res.comments.filter(c => c.resource == this.data[i].id)
        this.ratings = res.ratings.filter(c => c.resource == this.data[i].id)
        let twoComment: any;
        if (this.comments.length > 2) {
          twoComment.push(this.comments[0])
          twoComment.push(this.comments[1])
        } else {
          twoComment = Array.from(this.comments)
        }
        console.log(twoComment)
        this.data[i] = { ...this.data[i], comments: this.comments, fewComment: twoComment }
        console.log(this.data)
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

  followAuther = async (auther) => {
    let data = await this.api.getData('follow_author/?aut_id='+auther)
    data.subscribe((res: any) => {
      console.log(res)
    })
  }

  getRating(rater, resource) {
    let rate: any = this.ratings.filter(r => (r.rated_by == rater) && (r.resource == resource))
    if (rate[0] != undefined) {
      return rate[0].rating
    } else {
      return 0;
    }
  }

  layoutChange(n) {
    if (n == 1) {
      this.list = false
    } else {
      this.list = true
    }
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rate = $event.newValue
  }

  async ratingHandler(){
    if(this.rate!=0 || this.rateCommentForm.controls['comment'].value!=''){
      let dataobj:any={resource_id:this.modelData.id}
      if(this.rate!=0){
        dataobj={...dataobj,rating:this.rate}
      }
      if(this.rateCommentForm.controls['comment'].value!=''){
        dataobj={...dataobj,comment: this.rateCommentForm.controls['comment'].value}
      }
      let data=await this.api.postData('post_comment_rating/',dataobj)
      data.subscribe((res:any)=>{
        console.log(res)
        this.rate=0;
        this.rateCommentForm.reset();
      })
    }else{
      return null
    }
  }

}
