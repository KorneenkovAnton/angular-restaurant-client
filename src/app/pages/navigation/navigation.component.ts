import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isVisible: any;

  constructor() { }

  ngOnInit(): void {
    this.isVisible = localStorage.getItem("refreshToken") != null
  }

  logout() {
    localStorage.clear();
    location.replace("/orders");
  }
}
