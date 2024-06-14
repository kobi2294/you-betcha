import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@lib';
import { ContentComponent } from '../../../components/content/content.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'], 
  standalone: true, 
  imports: [SharedModule, ContentComponent]
})
export default class HelpComponent {


}
