import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isCollapsed: boolean = false;
  @Input() menu = [];
  constructor() {
    document.body.addEventListener('click', (e) => {
      if (e.target['classList'].value.indexOf('fa-bars') < 0 && this.isCollapsed) {
        this.isCollapsed = false;
      }
    })
  }

}