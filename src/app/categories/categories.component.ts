import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  subjects:any;
  constructor(private api: ApiService) {
   }

  ngOnInit() {
    this.getResources();
  }

  getResources = async () => {
    const data = await this.api.getData('http://ruangilmo.pythonanywhere.com/get_subjects/')
    data.subscribe((res: any) => {
      if(res.length>0){
        this.subjects=res;
      }
    })
  }

}
