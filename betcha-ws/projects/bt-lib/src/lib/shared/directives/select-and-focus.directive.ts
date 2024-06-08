import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: 'input[select-and-focus]', 
  standalone: true
})
export class SelectAndFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Focus the element
    this.renderer.selectRootElement(this.el.nativeElement).focus();

    // Select all text if it's an input or textarea element
    if (this.el.nativeElement.select) {
      this.el.nativeElement.select();
    }
  }
}