import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  data: any;
  empty=false
  constructor(private api: ApiService) {
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
   }

  ngOnInit() {
    this.getPending()
  }

  async getPending() {
    this.api.loader()
    let data = await this.api.getData('get_pending/')
    data.subscribe((res: any) => {
      console.log(res)
      this.api.noloader()
      if(res.length==0){
        this.empty=true
      }else{
        this.data = res
      }
    })
  }

  async approve(id,i){
    this.api.loader()
    let data = await this.api.getData('approve_resource/?rsc_id='+id)
    data.subscribe((res:any)=>{
      console.log(res)
      this.api.noloader()
      this.api.message('Approved')
      this.data.splice(i, 1);
    })
  }

}
