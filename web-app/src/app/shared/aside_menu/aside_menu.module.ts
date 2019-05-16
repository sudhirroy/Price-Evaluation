import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AsideMenuComponent } from './aside_menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AsideMenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  exports: [AsideMenuComponent]
})
export class AsideMenuComponentModule { }
