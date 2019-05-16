import { Component, Input } from '@angular/core';

@Component({
  selector: 'aside-menu-component',
  templateUrl: './aside_menu.component.html',
  styleUrls: ['./aside_menu.component.css']
})
export class AsideMenuComponent {
  @Input() menu;
}