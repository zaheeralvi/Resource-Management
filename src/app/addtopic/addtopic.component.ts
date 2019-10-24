import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.css']
})
export class AddtopicComponent implements OnInit {

  addTopic:any;
  subbmitted=false;
  constructor(private fb:FormBuilder,private api:ApiService,) { }

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
    }else{
      let topic={
        title:this.addTopic.controls['title'].value,
        subject:this.addTopic.controls['subject'].value,
        level:this.addTopic.controls['level'].value
      }
      let data=this.api.postData('/create_topic/',topic)
      data.subscribe((res:any)=>{
        console.log(res)
        this.addTopic.reset();
      })
    }
  }

  get f() { return this.addTopic.controls; }

}
