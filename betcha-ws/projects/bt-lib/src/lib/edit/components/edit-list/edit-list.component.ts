import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { ListItemDirective } from './list-item.directive';
import { EditPrefixDirective } from './edit-prefix.directive';
import { FormControl, Validators } from '@angular/forms';
import { ListItemValidator, ListItemValidatorType, ListItemValidators, validatorAdapter } from './edit-list.validators';
import { ItemType } from '../../../shared/models/item-type.model';

@Component({
  selector: 'lib-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss'
})
export class EditListComponent {
  @Input({required: true})
  items: ItemType[] = [];

  @Input()
  canDelete: boolean = true;

  @Input()
  canAdd: boolean = true;

  private _validator: ListItemValidator = ListItemValidators.none;
  @Input()
  set validator(value: ListItemValidatorType) {
    this._validator = ListItemValidators[value];
    this.addText.setValidators([Validators.required, validatorAdapter(this._validator)]);
  }


  @ContentChild(ListItemDirective)
  listItemDirective: ListItemDirective | null = null;

  @ContentChild(EditPrefixDirective)
  editPrefixDirective: EditPrefixDirective | null = null;

  @Output()
  deleted = new EventEmitter<number>();

  @Output()
  added = new EventEmitter<string>();



  addText = new FormControl('', [Validators.required, validatorAdapter(this._validator)]);

  commitAdd() {
    if (this.addText.invalid) return;
    
    const value = this.addText.value;
    if (!value) return;

    this.addText.reset();
    this.added.emit(value);
  }

  cancelAdd() {
    this.addText.reset('');
  }
}
