import { Component } from '@angular/core';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss'
})
export default class GroupDetailsComponent {

}
