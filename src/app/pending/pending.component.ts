import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  data: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPending()
  }

  async getPending() {
    let data = await this.api.getData('/get_pending/')
    data.subscribe((res: any) => {
      console.log(res)
      this.data = res
    })
  }

  async approve(id,i){
    let data = await this.api.getData('/approve_resource/?rsc_id='+id)
    data.subscribe((res:any)=>{
      console.log(res)
      this.data.splice(i, 1);
    })
  }

}
