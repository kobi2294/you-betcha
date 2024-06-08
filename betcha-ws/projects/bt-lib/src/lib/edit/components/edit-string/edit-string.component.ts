import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

type Mode = 'readonly' | 'edit';

@Component({
  selector: 'lib-edit-string',
  templateUrl: './edit-string.component.html',
  styleUrl: './edit-string.component.scss'
})
export class EditStringComponent implements OnChanges {
  @Input({required: true})
  value: string = '';

  @Input()
  caption = '';

  @Input()
  hint = '';

  @Input()
  enabled = true;

  @Input()
  required = true;

  @Output()
  changed = new EventEmitter<string>();

  form = new FormControl('');

  mode: Mode = 'readonly';

  get readonlyModeAllowed() {
    if (!this.enabled) return true;
    if (this.required && !this.value) return false;
    return true;
  }

  get editModeAllowed() {
    if (!this.enabled) return false;
    return true;
  }

  get canStartEdit() {
    return this.mode === 'readonly' && this.editModeAllowed;
  }

  get canCancel() {
    if (this.mode !== 'edit') return false;
    if (this.required && !this.value) return false;
    return true;
  }

  get canCommit() {
    if (this.mode !== 'edit') return false;
    if (this.required && !this.form.value) return false;
    if (this.form.value === this.value) return false;
    return true;
  }

  invalidateMode() {
    if (this.mode === 'edit' && !this.editModeAllowed) {
      this.cancel();
    }
    if (this.mode === 'readonly' && !this.readonlyModeAllowed) {
      this.startEdit();
    }
  }

  ngOnChanges(): void {
    this.invalidateMode();
  }


  startEdit() {
    if (!this.canStartEdit) return;
    this.form.reset(this.value);
    this.mode = 'edit';
}

  commit() {
    if (!this.canCommit) return;
    this.mode = 'readonly';

    if (this.value !== this.form.value!) {
      this.value = this.form.value!;    
      this.changed.emit(this.value);  
    }
  }

  cancel() {
    if (!this.canCancel) return;
    this.mode = 'readonly';
  }

}
