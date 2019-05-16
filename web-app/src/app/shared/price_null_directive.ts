import { Directive, ElementRef, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Directive({
  selector: '[filterprice]'
})
export class PriceNullDirective implements OnInit {
  private element: HTMLInputElement;
  @Output() ngModelChange = new EventEmitter();
  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener('focusout', (e) => {
        if (!this.element.value || !this.element.value.trim()) {
          //  this.element.value = '0.0';
        } 
        this.ngModelChange.emit(this.element.value);
    })
  }

}