import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  featured = [
    {
      title : 'Maths',
      author : 'Daniel'
    },
    {
      title : 'Physics',
      author : 'Farde'
    },
    {
      title : 'Chemistry',
      author : 'Smith'
    },
    {
      title : 'Pakistan Studies',
      author : 'Ayesha Malik'
    },
    
  ]

  new = [
    {
      title : 'Computer Science',
      author : 'Bill'
    },
    {
      title : 'Biology',
      author : 'Juairia Gem'
    },
    {
      title : 'Economic',
      author : 'Smith Mark'
    }

  ]
  constructor(private api: ApiService) {
    this.getSubjects();
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
   }

   getSubjects = () => {
     this.api.getallsubjects().subscribe(
       data => {this.featured = data ;},
       error => {console.log(error);}
       
     )
   }

  ngOnInit() {
  }

}
