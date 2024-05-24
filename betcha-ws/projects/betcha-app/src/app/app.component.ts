import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_VERSION } from '../../../bt-lib/src/utils/provide-version';
import { environment } from '../environments/environment';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  version = inject(APP_VERSION);
  env = environment.name;

  firestore = inject(Firestore);
  msg$ = getDoc(doc(this.firestore, 'constants/data')).then(res => res.data());
}
