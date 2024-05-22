import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

console.log('You Betcha bootstraping the app! ', environment.name);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
