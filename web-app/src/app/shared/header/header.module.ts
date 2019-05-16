import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ],
  providers: [],
  exports: [HeaderComponent]
})
export class HeaderComponentModule { }
