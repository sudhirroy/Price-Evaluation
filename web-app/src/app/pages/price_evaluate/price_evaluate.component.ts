import { Component } from '@angular/core';
import { AppRestService } from 'src/app/app.service';
import { ExcelService } from 'src/app/excel.service';
declare var d3: any;

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './price_evaluate.component.html',
  styleUrls: ['./price_evaluate.component.css']
})
export class PriceEvaluateComponent {
  panel = {
    active: true,
    modal: false,
    stockModal: false
  };
  customCalc = {
    result: null,
    stockData: []
  };
  exportData: any = [];
  price_detail_form = {
    data: [],
    stock_data: [],
    price: 'Select',
    price_quantity: ['5k', '10k', '20k', '25k', '40k', '50k', '75k', '100k', '200k', '250k', '400k', '500k', '1m'],
    component: 'Select',
    item_code: '',
    job_id: '',
    components: [],
    component_info: {},
    size_info: {},
    printing_info: [],
    elements: {},
    sizes: [],
    selected_size: 'Select',
    flap_sides: [],
    selected_flap_side: 'Select',
    stock_quantity: [],
    selected_stock: 'Select',
    selected_custom_stock: [],
    custom_stock_result: null,
    printing_quantity: [],
    selected_print: 'Select',
    sheet_quantity: [],
    selected_sheet: 'Select',
    pages_quantity: [],
    selected_page: 'Select',
    gusset_quantity: [],
    selected_gusset: 'Select',
    description: '',
    pricing_info: {
      printing_info: 0,
      custom_element: 0,
      custom_window: 0
    },
    result: 0,
    submitted: false
  };
  constructor(private app_service: AppRestService, private excelService: ExcelService) {
    d3.csv('./assets/raw_data.csv').then(data => {
      this.price_detail_form.data = data;
      this.price_detail_form.data.forEach(csv_data => {
        if (this.price_detail_form.components.indexOf(csv_data.Components) < 0) {
          this.price_detail_form.components.push(csv_data.Components);
        }
      });
    });
    d3.csv('./assets/window_elements.csv').then(window_elements => {
      window_elements.forEach(data => {
        if (this.price_detail_form.elements.hasOwnProperty(data.Components)) {
          if (this.price_detail_form.elements[data.Components].indexOf(element_info => element_info.name === data.Elements) < 0) {
            this.price_detail_form.elements[data.Components].push({ name: data.Elements,
               value: data.Conditions, price: data['Unit Price'] });
          }
        } else {
          this.price_detail_form.elements[data.Components] = [{ name: data.Elements, value: data.Conditions, price: data['Unit Price'] }];
        }
      });
    });
  }


  selectComponent(component) {
    this.price_detail_form.sizes = [];
    this.price_detail_form.selected_size = 'Select';
    this.price_detail_form.flap_sides = [];
    this.price_detail_form.selected_flap_side = 'Select';
    this.price_detail_form.stock_quantity = [];
    this.price_detail_form.selected_stock = 'Select';
    this.price_detail_form.submitted = false;
    this.price_detail_form.printing_quantity = [];
    this.price_detail_form.selected_print = 'Select';
    this.price_detail_form.size_info = {};
    this.app_service.calculateProductPrice({ component: component }).subscribe(component_info_data => {
      this.price_detail_form.component_info = component_info_data;
      this.price_detail_form.description = component_info_data.description;
      component_info_data.component_info.forEach(element_info => {
        this.price_detail_form.sizes.push(element_info.size);
      });
    }, (err) => {
      console.log(err);
    });
  }

  selectSize(size) {
    this.price_detail_form.flap_sides = [];
    this.price_detail_form.submitted = false;
    this.price_detail_form.selected_flap_side = 'Select';
    this.price_detail_form.stock_quantity = [];
    this.price_detail_form.selected_stock = 'Select';
    this.price_detail_form.printing_quantity = [];
    this.price_detail_form.selected_print = 'Select';
    this.price_detail_form.pages_quantity = [];
    this.price_detail_form.selected_page = 'Select';
    this.price_detail_form.sheet_quantity = [];
    this.price_detail_form.selected_sheet = 'Select';
    this.price_detail_form.size_info = this.price_detail_form.component_info['component_info']
      .find(element_info => element_info.size.trim() === size.trim());
    this.price_detail_form.component_info['component_info'].find(element_info => element_info.size.trim() === size.trim())
      .stocks_pricing.forEach(element_info => {
      this.price_detail_form.stock_quantity.push(element_info.stock);
    });
    this.price_detail_form.selected_flap_side = this.price_detail_form.component_info['component_info'].
      find(element_info => element_info.size.trim() === size.trim()).flap_side;
  }

  selectedFlapSide(flap_side) {

  }

  selectedStock(stock) {
    this.price_detail_form.printing_quantity = [];
    this.price_detail_form.selected_print = 'Select';
    const printing_info = this.price_detail_form.component_info['component_info'].
      find(element_info => element_info.size === this.price_detail_form.selected_size).
      stocks_pricing.filter(element_info => element_info.stock.trim() === stock.trim());

    printing_info.forEach(element_info => {
      this.price_detail_form.printing_quantity.push(element_info.printing);
    });
  }

  selectedPrinting(print_size) {
    this.price_detail_form.printing_info = this.price_detail_form.component_info['component_info']
      .find(element_info => element_info.size === this.price_detail_form.selected_size).stocks_pricing
      .filter(element_info => (element_info.stock.trim() === this.price_detail_form.selected_stock.trim() &&
      element_info.printing === print_size.trim()));

    if (this.price_detail_form.printing_info.find(element_info => element_info.sheet)) {
      this.price_detail_form.printing_info.forEach(element_info => {
        this.price_detail_form.sheet_quantity.push(element_info.sheet);
      });
    } else if (this.price_detail_form.printing_info.find(element_info => element_info.pages)) {
      this.price_detail_form.printing_info.forEach(element_info => {
        this.price_detail_form.pages_quantity.push(element_info.pages);
      });
    } else {
      this.price_detail_form.printing_info = this.price_detail_form.printing_info[0];
      this.price_detail_form.submitted = true;
    }
  }

  selectedSheet(sheet) {
    this.price_detail_form.printing_info = this.price_detail_form.printing_info
      .find(element_info => element_info.sheet.trim() === sheet.trim());
      this.price_detail_form.submitted = true;
  }

  selectedPages(pages) {
    this.price_detail_form.printing_info = this.price_detail_form.printing_info
      .find(element_info => element_info.pages.trim() === pages.trim());
      this.price_detail_form.submitted = true;
  }

  selectPrice(price) {
    if (!(this.price_detail_form.pricing_info instanceof Array)) {
      this.price_detail_form.submitted = true;
    }
  }

  Calculate() {
    this.price_detail_form.pricing_info.printing_info = parseFloat(this.price_detail_form.printing_info['price_' +
     this.price_detail_form.price]);
    this.price_detail_form.pricing_info.custom_window = this.calcuclateWindowPricing();
    this.price_detail_form.pricing_info.custom_element = this.calculateCustomElement();
    this.price_detail_form.result = (this.customCalc.result ? Number(this.customCalc.result) :
     this.price_detail_form.pricing_info['printing_info']) + this.price_detail_form.pricing_info.custom_window +
     this.price_detail_form.pricing_info.custom_element;
     this.panel.modal = true;
  }
  save() {
    this.exportData.push({
      'QR#': 'X',
      'QN#': 'Y',
      'job_id': this.price_detail_form.job_id,
      'Ver#': '1',
      'Opt#': 'N/A',
      'component': this.price_detail_form.component,
      'item_code': this.price_detail_form.item_code,
      'description': this.price_detail_form.selected_size + ', ' + (this.price_detail_form.selected_flap_side !== 'Select' ?
         (this.price_detail_form.selected_flap_side + ', ') : '') + (this.price_detail_form.selected_stock !== 'Select' ?
          (this.price_detail_form.selected_stock + ', ') : '') + (this.price_detail_form.selected_print !== 'Select' ?
             (this.price_detail_form.selected_print + ', ') : '') + (this.price_detail_form.selected_sheet !== 'Select' ?
              (this.price_detail_form.selected_sheet + ', ') : '') + (this.price_detail_form.selected_page !== 'Select' ?
              (this.price_detail_form.selected_page + ', ') : '') + (this.price_detail_form.selected_gusset !== 'Select' ?
              this.price_detail_form.selected_gusset : '') ,
      'total': this.price_detail_form.result,
      'base_price': this.price_detail_form.pricing_info['printing_info']
    });
  }
  calcuclateWindowPricing() {
    let price = 0;
    const x = this.price_detail_form.elements[this.price_detail_form.component];
    if (this.price_detail_form.elements[this.price_detail_form.component]) {
      this.price_detail_form.elements[this.price_detail_form.component].forEach(element_info => {
        if (element_info.marked) {
          if (element_info.value && element_info.times) {
            price += parseFloat(element_info.price) * element_info.times;
          } else {
            price += parseFloat(element_info.price);
          }
        }
      });
    }
    return price;
  }

  calculateCustomElement() {
    let price = 0;
    this.price_detail_form.size_info['elements_pricing'].forEach(element_info => {
      if (element_info.marked) {
        price += parseFloat(element_info['price_' + this.price_detail_form.price]);
      }
    });
    return price;
  }

  filterSelectedComponent(component) {
    if (component && component.length) {
      return component.filter(item => item.marked);
    }
  }

  close() {
    this.panel.modal = false;
  //  window.location.reload();
  }

  exportAsExcel() {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
     xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
     <x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>
     </x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))); };
    const format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }); };
    const table = document.getElementById('testTable');
      const ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
      window.location.href = uri + base64(format(template, ctx));
  }
  filterCustomDragInput(dragStockData) {
    return dragStockData.filter(item => item.name.length > 1);
  }
  SelectCustomStock(stock) {
    const selectedCustomStock = this.customCalc.stockData.findIndex(item => item.name === stock);
    let match_stock = this.price_detail_form.component_info['component_info']
      .find(element_info => element_info.size === this.price_detail_form.selected_size).stocks_pricing
        .filter(element_info => (element_info.stock.trim() === stock.trim() &&
            element_info.printing === this.price_detail_form.selected_print.trim()));
    match_stock = match_stock[0];
    const price = parseFloat(match_stock['price_' + this.price_detail_form.price]);
    if (selectedCustomStock < 0) {
      if (!this.customCalc.stockData.length) {
        this.customCalc.stockData.push({ name: stock, price: price });
      } else {
        const operand = this.customCalc.stockData[this.customCalc.stockData.length - 1];
        if ( operand.name === '+' || operand.name === '-' || operand.name === '*')  {
          this.customCalc.stockData.push({ name: stock, price: price });
        }
      }
    } else {
      if (selectedCustomStock > 0) {
        this.customCalc.stockData.splice(selectedCustomStock, 1);
        this.customCalc.stockData.splice(selectedCustomStock - 1, 1);
      } else {
        this.customCalc.stockData.splice(selectedCustomStock, 1);
      }
    }
    this.calculateCustomStockPrice();
  }
  calculateCustomStockPrice() {
    let price = 0;
    this.customCalc.stockData.forEach((stock, index) => {
      if (!index) {
        price = stock.price;
      } else {
        if (stock.name.length > 0) {
          if (this.customCalc.stockData[index - 1].name === '+') {
            price = price + stock.price;
          } else if (this.customCalc.stockData[index - 1].name === '-') {
            price = price - stock.price;
          } else if (this.customCalc.stockData[index - 1].name === '*') {
            price = price * stock.price;
          }
        }
      }
    });
    this.customCalc.result = price.toFixed(4);
  }
  addOperand(operator) {
    this.customCalc.stockData.push({name: operator, price: null});
  }
  openCustomStockModal() {
    this.panel.stockModal = true;
    this.price_detail_form.printing_info = this.price_detail_form.component_info['component_info']
      .find(element_info => element_info.size === this.price_detail_form.selected_size).stocks_pricing
        .filter(element_info => (element_info.stock.trim() === this.price_detail_form.selected_stock.trim() &&
            element_info.printing === this.price_detail_form.selected_print.trim()));
    this.price_detail_form.printing_info = this.price_detail_form.printing_info[0];
    this.customCalc.result = parseFloat(this.price_detail_form.printing_info['price_' +
       this.price_detail_form.price]);
  }
  isSelectedStock(stock) {
    return this.customCalc.stockData.find( item => item.name === stock );
  }
}







