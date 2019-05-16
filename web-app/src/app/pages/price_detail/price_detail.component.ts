import { Component } from '@angular/core';
import { AppRestService } from 'src/app/app.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var d3: any;

@Component({
  selector: 'app-price-detail-component',
  templateUrl: './price_detail.component.html',
  styleUrls: ['./price_detail.component.css']
})
export class PriceDetailComponent {
  panel = {
    active: true,
    header: 'Add New Price Details'
  };

  url_info = null;

  submit = {
    save: 'Submit'
  };

  price_detail_form = {
    data: [],
    components: [],
    component: 'Select',
    description: '',
    sizes: [],
    selected_size: 'Select',
    flap_sides: [],
    selected_flap_side: '',
    elements: [{}],
    sheet_quantity: [],
    selected_sheet: 'Select',
    pages_quantity: [],
    selected_page: 'Select',
    gusset_quantity: [],
    selected_gusset: 'Select',
    entry: [{}]
  };
  constructor(private app_service: AppRestService, private utilityService: UtilityService, private route: ActivatedRoute,
     private router: Router) {
    this.get_details();
    this.fetchRawData();
  }

  set_existing_stock_data() {
    if (this.utilityService.get_component_info() && (this.utilityService.get_component_info().price_info === this.url_info['price_info'])) {
      const component_info_detail = this.utilityService.get_component_info().component_info.component_info.
        find(item => item._id === this.url_info['price_info']);
        if (component_info_detail) {
        this.selectComponent(this.utilityService.get_component_info().component_info.component);
        this.selectedSize(component_info_detail.size);
        this.price_detail_form.description = this.utilityService.get_component_info().component_info.description;
        this.price_detail_form.selected_flap_side = component_info_detail.flap_side;
        this.price_detail_form.selected_sheet = component_info_detail.sheet;
        this.price_detail_form.selected_page = component_info_detail.pages;
        this.price_detail_form.selected_gusset = component_info_detail.gusset;
        this.price_detail_form.entry = component_info_detail.stocks_pricing;
        this.price_detail_form.elements = component_info_detail.elements_pricing;
        this.submit.save = 'Update';
        this.panel.header = 'Update Price Details';
      }
    }
  }

  fetchRawData() {
    d3.csv('./assets/raw_data.csv').then(data => {
      this.price_detail_form.data = data;
      this.price_detail_form.data.forEach(element => {
        if (this.price_detail_form.components.indexOf(element.Components) < 0) {
          this.price_detail_form.components.push(element.Components);
        }
      });
    //  console.log(data);
    })
    .then(() => {
      this.url_info = {
        price_info: this.route.snapshot.queryParams['price_info']
      };
      if (this.url_info['price_info']) {
        this.set_existing_stock_data();
      }
    });
  }

  fillCSVDetails(csv_data, type) {
    csv_data.forEach((element, index) => {
      if (type === 'stock') {
        if (element.Stock) {
          this.price_detail_form.entry[index] = {
            pages: element['pages'],
            stock: element.Stock,
            printing: element.Printing,
            'price_5k': element['5k'],
            'price_10k': element['10k'],
            'price_20k': element['20k'],
            'price_25k': element['25k'],
            'price_40k': element['40k'],
            'price_50k': element['50k'],
            'price_75k': element['75k'],
            'price_100k': element['100k'],
            'price_200k': element['200k'],
            'price_250k': element['250k'],
            'price_400k': element['400k'],
            'price_500k': element['500k'],
            'price_1mm': element['1mm'],
          };
        }
      } else {
        if (element.Element) {
          this.price_detail_form.elements[index] = {
            element_name: element.Element,
            'price_5k': element['5k'],
            'price_10k': element['10k'],
            'price_20k': element['20k'],
            'price_25k': element['25k'],
            'price_40k': element['40k'],
            'price_50k': element['50k'],
            'price_75k': element['75k'],
            'price_100k': element['100k'],
            'price_200k': element['200k'],
            'price_250k': element['250k'],
            'price_400k': element['400k'],
            'price_500k': element['500k'],
            'price_1mm': element['1mm'],
          };
        }
      }
    });
  }

  openFile(event, type) {
    const reader = new FileReader();
    reader.onload = (e) => {
        this.fillCSVDetails(d3.csvParse(reader.result), type);
    };
    reader.readAsText(event.target.files[0]);
  }


  selectComponent(component) {
    this.price_detail_form.component = component;
    this.price_detail_form.sizes = [];
    this.price_detail_form.selected_size = 'Select';
    this.price_detail_form.data.forEach(element => {
      if (component.toLowerCase() === element.Components.toLowerCase()) {
        if (this.price_detail_form.sizes.indexOf(element.Size) < 0) {
          this.price_detail_form.sizes.push(element.Size);
        }
      }
    });
  }

  selectedSize(size) {
    this.price_detail_form.selected_size = size;
    this.price_detail_form.flap_sides = [];
    this.price_detail_form.selected_flap_side = 'Select';
    this.price_detail_form.sheet_quantity = [];
    this.price_detail_form.selected_sheet = 'Select';
    this.price_detail_form.pages_quantity = [];
    this.price_detail_form.selected_page = 'Select';
    this.price_detail_form.gusset_quantity = [];
    this.price_detail_form.selected_gusset = 'Select';
    this.price_detail_form.data.forEach(element => {
      if (size.replace(/\s+/g, ' ').trim() === element.Size.replace(/\s+/g, ' ').trim()) {
        if (element['Flap Side'] !== '-' && this.price_detail_form.flap_sides.indexOf(element['Flap Side']) < 0) {
          this.price_detail_form.flap_sides.push(element['Flap Side']);
        }
        if (element['Sheets'] !== '-' && this.price_detail_form.sheet_quantity.indexOf(element['Sheets']) < 0) {
          this.price_detail_form.sheet_quantity.push(element['Sheets']);
        }
        if (element['Pages'] !== '-' && this.price_detail_form.pages_quantity.indexOf(element['Pages']) < 0) {
          this.price_detail_form.pages_quantity.push(element['Pages']);
        }
        if (element['Gusset'] !== '-' && this.price_detail_form.gusset_quantity.indexOf(element['Gusset']) < 0) {
          this.price_detail_form.gusset_quantity.push(element['Gusset']);
        }
      }
    });
  }

  add_new_entry() {
    const entry = this.price_detail_form.entry[this.price_detail_form.entry.length - 1];
    if (!entry || (entry['stock'] && entry['stock'].trim())) {
      const text = Array.from(document.querySelectorAll('.price_detail_row.stock input'));
      text.forEach(input => (input as HTMLElement).focus());
      this.price_detail_form.entry.push({});
      (text[text.length - 1] as HTMLElement).blur();
    } else {
      alert('Please fill the stock first');
    }
 }

  add_new_elements() {
    const entry = this.price_detail_form.elements[this.price_detail_form.elements.length - 1];
    if (!entry || (entry['element_name'] && entry['element_name'].trim())) {
      const text = Array.from(document.querySelectorAll('.price_detail_row.element input'));
      text.forEach(input => (input as HTMLElement).focus());
      this.price_detail_form.elements.push({});
      (text[text.length - 1] as HTMLElement).blur();
    } else {
      alert('Please fill the Element first');
    }
  }


  Calculate() {
    const price_detail_data = {
      component: this.price_detail_form.component,
      description: this.price_detail_form.description,
      size: this.price_detail_form.selected_size,
      flap_side: (this.price_detail_form.selected_flap_side === 'Select' ? '' : this.price_detail_form.selected_flap_side),
      sheet: (this.price_detail_form.selected_sheet === 'Select' ? '' : this.price_detail_form.selected_sheet),
      pages: (this.price_detail_form.selected_page === 'Select' ? '' : this.price_detail_form.selected_page),
      gusset: (this.price_detail_form.selected_gusset === 'Select' ? '' : this.price_detail_form.selected_gusset),
      stocks_pricing: this.price_detail_form.entry,
      elements_pricing: this.price_detail_form.elements
    };

    const stock_pricing = price_detail_data.stocks_pricing[price_detail_data.stocks_pricing.length - 1];
    const element_pricing = price_detail_data.elements_pricing[price_detail_data.elements_pricing.length - 1];

    if (stock_pricing && (!stock_pricing['stock'] || !stock_pricing['stock'].trim())) {
      price_detail_data.stocks_pricing.pop();
    }
    if (element_pricing && (!element_pricing['element_name'] || !element_pricing['element_name'].trim())) {
      price_detail_data.elements_pricing.pop();
    }
    if (this.url_info && this.url_info.price_info) {
      price_detail_data['component_id'] = this.utilityService.get_component_info().component_info._id;
      price_detail_data['price_info_id'] = this.url_info['price_info'];
      this.app_service.updateProduct(price_detail_data).subscribe((result) => {
        this.router.navigate(['stock-price']);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.app_service.addProduct(price_detail_data).subscribe((result) => {
        console.log(result, 'add Data');
        this.price_detail_form = {
          data: [],
          components: [],
          component: 'Select',
          description: '',
          sizes: [],
          selected_size: 'Select',
          flap_sides: [],
          selected_flap_side: '',
          elements: [{}],
          sheet_quantity: [],
          selected_sheet: 'Select',
          pages_quantity: [],
          selected_page: 'Select',
          gusset_quantity: [],
          selected_gusset: 'Select',
          entry: [{}]
        };
        this.fetchRawData();
      }, (err) => {
        console.log(err);
      });
    }
  }

  get_details() {
    this.app_service.getProduct().subscribe((result) => {
      console.log(result, 'Data');
    }, (err) => {
      console.log(err);
    });
  }
}
