import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  addResource:any;
  subbmitted=false;
  constructor(private fb:FormBuilder,private api:ApiService,) { }

  ngOnInit() {
    this.addResource=this.fb.group({
      title: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      level: ['',[Validators.required]]
    })
  }

  addResourceHandler(){
    if(this.addResource.invalid){
      this.subbmitted=true
    }else{
      let topic={
        title:this.addResource.controls['title'].value,
        subject:this.addResource.controls['subject'].value,
        level:this.addResource.controls['level'].value
      }
      let data=this.api.postData('/create_topic/',topic)
      data.subscribe((res:any)=>{
        console.log(res)
        this.addResource.reset();
      })
    }
  }

  get f() { return this.addResource.controls; }

}
