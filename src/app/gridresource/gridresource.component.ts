import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gridresource',
  templateUrl: './gridresource.component.html',
  styleUrls: ['./gridresource.component.css']
})
export class GridresourceComponent implements OnInit {

  constructor() { 
    if (localStorage.getItem('Token') == null || localStorage.getItem('Token') == undefined) {
      window.location.href='/login'
    } 
  }

  ngOnInit() {
  }

}
