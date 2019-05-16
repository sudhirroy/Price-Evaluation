import { Component, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() notifyPage = new EventEmitter();
  menu = {
    title: '',
    pages: [{
      title: 'Dashboard',
      img: 'assets/dashboard.png',
      link: 'dashboard',
      is_active: false
    },
    {
      title: 'Price Evaluate',
      img: 'assets/tt.png',
      link: 'price-evaluate',
      is_active: false
    },
    {
      title: 'Price Detail',
      img: 'assets/detail.png',
      link: 'price-detail',
      is_active: false
    },
    {
      title: 'Stock Price',
      img: 'assets/contact.png',
      link: 'stock-price',
      is_active: false
    },
    {
      title: 'About Us',
      img: 'assets/dashboard.png',
      link: 'about-us',
      is_active: false
    },
    {
      title: 'Help',
      img: 'assets/tt.png',
      link: 'help',
      is_active: false
    }]
  };

  constructor(private router: Router) {
    this.checkUrl(this.router.url);
    router.events.subscribe(event  => {
      if (event instanceof NavigationEnd) {
         this.checkUrl(event.url);
      }
    });
  }

  checkUrl(url) {
    this.menu.pages.map(menu => {
      menu.is_active = false;
      if (url.indexOf(menu.link) > -1 ) {
        menu.is_active = true;
        this.menu.title = menu.title;
      //  this.notifyPage.emit(menu);
      }
    });
  }
}