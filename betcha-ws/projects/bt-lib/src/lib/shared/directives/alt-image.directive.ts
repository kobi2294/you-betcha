import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  standalone: true,
  selector: 'img[altImage]'
})
export class AltImageDirective {
  @Input('altImage')
  altImage?: string;


  @HostListener('error')
  onError() {
    const fallback = this.altImage || 'assets/images/guest.png';
    const element = this.eRef.nativeElement as HTMLImageElement;

    element.src = fallback;
  }


  constructor(private eRef: ElementRef) { }

}
