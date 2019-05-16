import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { HeaderComponentModule } from './shared/header/header.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PriceDetailComponent } from './pages/price_detail/price_detail.component';
import { PriceNullDirective } from './shared/price_null_directive';
import { PriceEvaluateComponent } from './pages/price_evaluate/price_evaluate.component';
import { AsideMenuComponentModule } from './shared/aside_menu/aside_menu.module';
import { AboutUsComponent } from './pages/about_us/about_us.component';
import { HelpComponent } from './pages/help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from './shared/utility.service';
import { StockPriceComponent } from './pages/stock_price/stock_price.component';
import { ExcelService } from './excel.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PriceDetailComponent,
    PriceNullDirective,
    PriceEvaluateComponent,
    StockPriceComponent,
    AboutUsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HeaderComponentModule,
    AsideMenuComponentModule,
    HttpClientModule
  ],
  providers: [UtilityService, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
