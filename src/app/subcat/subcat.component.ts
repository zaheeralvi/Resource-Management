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
  empty=false;
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
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
   }

  ngOnInit() {
    this.getSubCategories()
  }

  getSubCategories=async ()=>{
    this.api.loader()
    const data=await this.api.getData('get_level_by_subject/?sub_id='+this.id)
    data.subscribe((res:any)=>{
      console.log(res)
      this.api.noloader()
      if(res.length==0){
        this.empty=true
      }else{
        this.data=res;
      }
    })
  }

}
