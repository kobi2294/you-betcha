import { Component, ElementRef, computed, effect, inject, input, output, viewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedModule } from '../../../shared';

@Component({
  selector: 'lib-edit-image',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-image.component.html',
  styleUrl: './edit-image.component.scss'
})
export class EditImageComponent {
  readonly sanitizer = inject(DomSanitizer);

  value = input.required<string>();

  changed = output<File>();

  fallback = input('assets/images/fallback.svg');

  imageUrl = computed(() => this.value() || this.fallback());

  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');


  onOpenFileDialog() {
    this.fileInput().nativeElement.click();
  }


  onSelect(): void {
    const file = this.fileInput().nativeElement.files?.[0];
    this.fileInput().nativeElement.value = '';
    if (!file) return;
    this.changed.emit(file);
  }
}
