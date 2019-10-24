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
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.topRated();
  }
  topRated = async () => {
    let data = this.api.getData('sort_resources/?rating=True')
    data.subscribe((res: any) => {
      console.log(res)
      this.data = res

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
