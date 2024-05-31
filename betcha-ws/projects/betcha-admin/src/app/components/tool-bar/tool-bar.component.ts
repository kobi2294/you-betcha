import { Component } from '@angular/core';
import { SharedModule } from '@lib';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

}
