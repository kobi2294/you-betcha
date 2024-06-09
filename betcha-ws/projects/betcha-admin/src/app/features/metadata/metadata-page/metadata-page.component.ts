import { Component, inject } from '@angular/core';
import { MetadataStore } from './store/metadata.store';
import { PagesModule, SharedModule } from '@lib';

@Component({
  selector: 'app-metadata-page',
  standalone: true,
  imports: [SharedModule, PagesModule],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss', 
  providers: [MetadataStore]
})
export default class MetadataPageComponent {
  readonly store = inject(MetadataStore);
}
