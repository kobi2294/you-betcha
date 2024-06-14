import { Component, input } from '@angular/core';
import { MatchBaseModel } from './match-base.model';
import { SharedModule } from '../../../../../bt-lib/src/lib/shared';

@Component({
  selector: 'app-match-base',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './match-base.component.html',
  styleUrl: './match-base.component.scss'
})
export class MatchBaseComponent {
  match = input.required<MatchBaseModel>();

}
