import { Directive, TemplateRef } from '@angular/core';
import { HeaderTemplateContext } from '../models/header-template-context.model';

@Directive({
  selector: '[libTableHeader]'
})
export class TableHeaderDirective {

  constructor(
    public template: TemplateRef<HeaderTemplateContext>
  ) { }

}
