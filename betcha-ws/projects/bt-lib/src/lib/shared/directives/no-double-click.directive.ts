import { 
    Directive, 
    EventEmitter, 
    HostListener, 
    Input, 
    Output 
  } from '@angular/core';
  import { Subject } from 'rxjs';
  import { throttleTime } from 'rxjs/operators';
  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
  
  @Directive({
    standalone: true,
    selector: '[libNoDoubleClick]'
  })
  export class NoDoubleClickDirective {
    @Input() 
    debounceTime = 500;
  
    @Output() 
    debounceClick = new EventEmitter();
    
    private clicks = new Subject();
  
    constructor() {
        this.clicks.pipe(
            throttleTime(this.debounceTime), 
            takeUntilDestroyed()
        )
    }
  
    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.clicks.next(event);
    }
  }