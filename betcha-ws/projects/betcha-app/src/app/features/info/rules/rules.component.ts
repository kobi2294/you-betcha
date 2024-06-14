import { Component, computed, inject } from '@angular/core';
import { ContentComponent } from "../../../components/content/content.component";
import { MetadataStore, SharedModule } from '@lib';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss'],
    standalone: true,
    imports: [ContentComponent, SharedModule]
})
export default class RulesComponent {
    readonly metadata = inject(MetadataStore);

    readonly stages = computed(() => this.metadata.stages()
        .map(stage => stage.displayName.startsWith('Group') 
        ? ({ ...stage, displayName: 'Groups Stage' })
        : stage)
        .filter((stage, index) => (stage.displayName !== 'Groups Stage') || (index === 0)));
        


}
