import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent implements OnInit {

  addTopic:any;
  subbmitted=false;
  constructor(private fb:FormBuilder,private api:ApiService,private toastr: ToastrService) { }

  ngOnInit() {
    this.addTopic=this.fb.group({
      title: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      level: ['',[Validators.required]]
    })
  }

  addTopicHandler(){
    if(this.addTopic.invalid){
      this.subbmitted=true
      this.toastr.error('All Fields are Required')
    }else{
      let topic={
        title:this.addTopic.controls['title'].value,
        subject:this.addTopic.controls['subject'].value,
        level:this.addTopic.controls['level'].value
      }
      let data=this.api.postData('/create_topic/',topic)
      data.subscribe((res:any)=>{
        console.log(res)
        this.toastr.success('New Topic Added Successfully')
        this.addTopic.reset();
      })
    }
  }

  get f() { return this.addTopic.controls; }

}
