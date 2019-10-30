import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { async } from '@angular/core/testing';
import { Validators, FormBuilder } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';

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
  modelData: any
  modal = false
  rateCommentForm: any
  rate = 0
  constructor(private api: ApiService, private fb: FormBuilder) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
   }

  ngOnInit() {
    this.topRated();
    this.rateCommentForm = this.fb.group({
      comment: ['', [Validators.required]],
    })
  }
  topRated = async () => {
    let data = await this.api.getData('sort_resources/?rating=True')
    data.subscribe((res: any) => {
      this.data = res.resources;

      for (let i = 0; i < this.data.length; i++) {
        this.comments = res.comments.filter(c => c.resource == this.data[i].id)
        this.ratings = res.ratings.filter(c => c.resource == this.data[i].id)
        let twoComment = []
        if (this.comments.length > 2) {
          twoComment=this.comments.slice(0, 2);
        } else {
          twoComment = [...twoComment, this.comments]
        }
        this.data[i] = { ...this.data[i], comments: this.comments, fewComment: twoComment }
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

  getRating(rater, resource) {
    let rate: any = this.ratings.filter(r => (r.rated_by == rater) && (r.resource == resource))
    if (rate[0] != undefined) {
      return rate[0].rating
    } else {
      return 0;
    }
  }

  resourceDetails(resource) {
    console.log(resource)
    this.modelData = resource
    this.modal = true
  }
  hideModal() {
    this.modal = false
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    this.rate = $event.newValue
  }

  saveLink = async (id) => {
    let data = await this.api.getData(`save_resource?rsc_id=${id}`)
    data.subscribe((res: any) => {
      console.log(res)
      this.api.message(res.OK)

    })
  }

  async ratingHandler() {
    if (this.rate != 0 || this.rateCommentForm.controls['comment'].value != '') {
      let dataobj: any = { resource_id: this.modelData.id }
      if (this.rate != 0) {
        dataobj = { ...dataobj, rating: this.rate }
      }
      if (this.rateCommentForm.controls['comment'].value != '') {
        dataobj = { ...dataobj, comment: this.rateCommentForm.controls['comment'].value }
      }
      let data = await this.api.postData('post_comment_rating/', dataobj)
      data.subscribe((res: any) => {
        console.log(res)
        this.rate = 0;
        this.rateCommentForm.reset();
      })
    } else {
      return null
    }
  }

  followAuther = async (auther) => {
    let data = await this.api.getData('follow_author/?aut_id=' + auther)
    data.subscribe((res: any) => {
      console.log(res)
    })
  }
}
