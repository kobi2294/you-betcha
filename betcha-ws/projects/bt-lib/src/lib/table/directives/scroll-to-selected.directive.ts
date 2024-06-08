import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import { TableStore } from '../table-store.service';
import {
  Observable,
  Subject,
  debounceTime,
  switchAll,
  withLatestFrom,
} from 'rxjs';
import { TableVm } from '../view-models/table.vm';

@Directive({
  selector: '[scroll]',
})
export class ScrollToSelectedDirective {
  private itemSize$ = new Subject<number>();
  @Input()
  set itemSize(value: string | number | null) {
    if (typeof value === 'string') value = Number.parseInt(value);
    if (value !== null) this.itemSize$.next(value);
  }

  private scrollHigh$ = new Subject<Observable<any>>();
  private scroll$ = this.scrollHigh$.pipe(switchAll());

  @Input()
  set scroll(value: Observable<any>) {
    this.scrollHigh$.next(value);
  }

  invalidate(vm: TableVm, size: number, elem: HTMLElement) {
    const index = vm.rows.findIndex((r) => r.isSelected);
    if (index < 0) return;

    const top = index * size;
    const bottom = (index + 1) * size;

    const viewportTop = elem.scrollTop;
    const viewportBottom = elem.scrollTop + elem.clientHeight;

    if (top >= viewportTop && bottom <= viewportBottom) return;

    if (top < viewportTop) {
      elem.scrollTo({
        top: top,
        behavior: 'smooth',
      });
      return;
    }

    if (bottom > viewportBottom) {
      elem.scrollTo({
        top: bottom - elem.clientHeight,
        behavior: 'smooth',
      });
    }
  }

  constructor(
    store: TableStore,
    destroy: DestroyRef,    
    element: ElementRef<HTMLElement>
  ) {
    this.scroll$
      .pipe(
        debounceTime(0),
        withLatestFrom(store.vm$, this.itemSize$),
        takeUntilDestroyed(destroy)
      )
      .subscribe(([_, vm, size]) =>
        this.invalidate(vm, size, element.nativeElement)
      );
  }
}
