import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.css']
})
export class SubcatComponent implements OnInit {
  
  id;
  data:any;
  levels = [
    {
      lev : '1',
    },
    {
      lev : '2',
    },
    {
      lev : '3',
    }

  ]
  constructor(private api:ApiService,private route:ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
   }

  ngOnInit() {
    this.getSubCategories()
  }

  getSubCategories=async ()=>{
    const data=await this.api.getData('http://ruangilmo.pythonanywhere.com/get_levels/'+this.id)
    data.subscribe((res:any)=>{
      console.log(res)
      this.data=res;
    })
  }

}