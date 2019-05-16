import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PriceDetailComponent } from './pages/price_detail/price_detail.component';
import { PriceEvaluateComponent } from './pages/price_evaluate/price_evaluate.component';
import { AboutUsComponent } from './pages/about_us/about_us.component';
import { HelpComponent } from './pages/help/help.component';
import { StockPriceComponent } from './pages/stock_price/stock_price.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'price-evaluate', component: PriceEvaluateComponent },
  { path: 'price-detail', component: PriceDetailComponent},
  { path: 'stock-price', component: StockPriceComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
