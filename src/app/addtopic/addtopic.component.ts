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
  subjects:any;
  sub_id:any;
  subCat:any;
  constructor(private fb:FormBuilder,private api:ApiService) { 
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
  }

  ngOnInit() {
    this.addTopic=this.fb.group({
      title: ['',[Validators.required]],
      subject: ['',[Validators.required]],
      level: ['',[Validators.required]]
    })
    this.getSubjects()
  }

  getSubjects = async () => {
    const data = await this.api.getData('get_subjects/')
    data.subscribe((res: any) => {
      console.log(res)
      if (res.length > 0) {
        this.subjects = res;
      }
    })
  }

  async getLevel(e) {
    this.sub_id = e.target.value;

    const data = await this.api.getData('get_level_by_subject/?sub_id=' + this.sub_id)
    data.subscribe((res: any) => {
      console.log(res)
      this.subCat = res;
    })
  }


  async addTopicHandler(){
    if(this.addTopic.invalid){
      this.subbmitted=true
    }else{
      let topic={
        title:this.addTopic.controls['title'].value,
        subject:this.addTopic.controls['subject'].value,
        level:this.addTopic.controls['level'].value
      }
      console.log(topic)
      let data= await this.api.postData('create_topic/',topic)
      data.subscribe((res:any)=>{
        console.log(res)
        this.api.message('New Topic Created')
        this.addTopic.reset();
      })
    }
  }

  get f() { return this.addTopic.controls; }

}
