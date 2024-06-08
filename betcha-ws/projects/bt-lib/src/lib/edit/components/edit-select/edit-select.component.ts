import { AfterContentInit, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { OptionTemplateDirective } from './option-template.directive';

export type SelectionOption = {value: any, displayName: string};

@Component({
  selector: 'lib-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrl: './edit-select.component.scss'
})
export class EditSelectComponent implements AfterContentInit{
  @ContentChild(OptionTemplateDirective, {static: false})
  optionTemplate: OptionTemplateDirective | undefined = undefined;

  ngAfterContentInit(): void {
    console.log('the template is', this.optionTemplate);
  }


  @Input({required: true})
  value: any = null;

  @Input({required: true})
  options: SelectionOption[] = [];


  get selectedOption() {
    return this.options.find(option => option.value === this.value);
  }

  get selectedCaption() {
    return this.selectedOption?.displayName || '';
  }

  get selectedValue() {
    return this.selectedOption?.value;
  }

  @Input()
  caption = '';

  @Input()
  enabled = true;

  @Output()
  changed = new EventEmitter<any>();

  select(value: any) {
    if (value !== this.value) {
      this.value = value;
      this.changed.emit(value);
    }
  }


}
