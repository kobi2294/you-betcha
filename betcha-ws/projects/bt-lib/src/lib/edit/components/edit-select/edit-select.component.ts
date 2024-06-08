import { Component, EventEmitter, Input, Output } from '@angular/core';

type Option = {value: any, displayName: string};

@Component({
  selector: 'lib-edit-select',
  templateUrl: './edit-select.component.html',
  styleUrl: './edit-select.component.scss'
})
export class EditSelectComponent {
  @Input({required: true})
  value: any = null;

  @Input({required: true})
  options: Option[] = [];


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
