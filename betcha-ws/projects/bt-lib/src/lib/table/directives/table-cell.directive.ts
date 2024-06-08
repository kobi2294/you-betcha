import { Directive, TemplateRef } from '@angular/core';
import { CellTemplateContext } from '../models/cell-template-context.model';

@Directive({
  selector: '[libTableCell]'
})
export class TableCellDirective {

  constructor(
    public template: TemplateRef<CellTemplateContext>) { }

}
