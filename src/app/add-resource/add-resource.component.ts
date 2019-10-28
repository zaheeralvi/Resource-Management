import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  addResource: any;
  subbmitted = false;
  subjects: any;
  subCat: any;
  topic: any;
  sub_id;
  lvl_id;
  topic_id;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.getSubjects();
    let reg='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    this.addResource = this.fb.group({
      link: ['', [Validators.required,Validators.pattern(reg)]],
      subject: ['', [Validators.required]],
      level: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      resource_type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
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

  async getTopic(e){
    this.lvl_id = e.target.value;

    let data=await this.api.getData(`get_topic_by_sub_level/?sub_id=${this.sub_id}&lev_id=${this.lvl_id}`)
    data.subscribe((res:any)=>{
      console.log(res)
      this.topic=res;
    })
  }

  addResourceHandler() {
    if (this.addResource.invalid) {
      this.subbmitted = true
    } else {
      let topic = {
        link: this.addResource.controls['link'].value,
        subject: this.addResource.controls['subject'].value,
        level: this.addResource.controls['level'].value,
        topic: this.addResource.controls['topic'].value,
        resource_type: this.addResource.controls['resource_type'].value,
        description: this.addResource.controls['description'].value,
      }

      let data = this.api.postData('get_create_resource/', topic)
      data.subscribe((res: any) => {
        console.log(res)
        this.addResource.reset();
      })
    }
  }

  get f() { return this.addResource.controls; }

}
