import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sub-topic',
  templateUrl: './sub-topic.component.html',
  styleUrls: ['./sub-topic.component.css']
})
export class SubTopicComponent implements OnInit {

  query
  subcat;
  lvl;
  topic;
  data:any;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/#/login'
    } 
    this.query = this.route.queryParams
    this.subcat = this.query._value.subcat
    this.lvl = this.query._value.lvl
    this.topic = this.query._value.topic
  }

  ngOnInit() {
  }

}
