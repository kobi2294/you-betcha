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
  onError(ev: Event) {
    const fallback = this.altImage || 'assets/images/guest.png';
    const element = this.eRef.nativeElement as HTMLImageElement;


    const fullFallback = new URL(fallback, window.location.href).href;

    if (fullFallback === element.src) return; // already trying to get the fallback image, no point to try again
    element.src = fallback;
  }


  constructor(private eRef: ElementRef) { }

}

