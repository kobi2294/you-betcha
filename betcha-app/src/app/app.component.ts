import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APP_VERSION } from './tokens/app-version.token';
import { environment } from '../environments/environment';
import { Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

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
