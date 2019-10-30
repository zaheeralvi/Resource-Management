import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  subjects:any;
  empty=false
  constructor(private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
   }

  ngOnInit() {
    this.getResources();
  }

  getResources = async () => {
    this.api.loader()
    const data = await this.api.getData('get_subjects/')
    data.subscribe((res: any) => {
      this.api.noloader()
      if(res.length>0){
        this.subjects=res;
      }else{
        this.empty=true
      }
    })
  }

}
