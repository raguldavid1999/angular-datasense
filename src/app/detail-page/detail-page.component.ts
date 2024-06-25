import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  constructor(private router: Router) {}
  receivedRouteData: any;
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    console.log(history.state);
    this.receivedRouteData = history.state['brandData'];
    // if (navigation?.extras.state) {
    //   console.log(navigation.extras.state['example']);

    //   this.receivedRouteData = navigation.extras.state['example'];
    // }
  }
}
