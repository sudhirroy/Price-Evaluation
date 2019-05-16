import { Component } from '@angular/core';
import { AppRestService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-stock-price-component',
  templateUrl: './stock_price.component.html',
  styleUrls: ['./stock_price.component.css']
})
export class StockPriceComponent {
  stock_info_data = [];
  price_info = null;

  constructor(private app_service: AppRestService, private router: Router, private utilityService: UtilityService) {
    this.get_details();
  }
  get_details() {
    this.app_service.getProduct().subscribe((result) => {
      this.stock_info_data = result;
    }, (err) => {
      console.log(err);
    });
  }

  edit(componentInfo, price_info) {
    this.utilityService.set_component_info({price_info: componentInfo._id, component_info: price_info });
    this.router.navigate(['price-detail'], { queryParams: {price_info: componentInfo._id } });
  }
  selectComponent(event) {
    this.price_info = this.stock_info_data.find(item => item.component === event);
    this.price_info.component_info.map(item => item.active = true);
    console.log(event);
  }
}
