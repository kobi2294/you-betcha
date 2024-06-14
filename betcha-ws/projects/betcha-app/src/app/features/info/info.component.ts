import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'], 
  standalone: true,
  imports: [SharedModule]
})
export default class InfoPageComponent {

}
