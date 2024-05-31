import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore, PagesModule, SharedModule } from '@lib';
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [],
    imports: [RouterModule, SharedModule, PagesModule, ToolBarComponent]
})
export class AppComponent {
  authStore = inject(AuthStore)
  user = this.authStore.user;
  loginRequired = this.authStore.loginRequired;

  logout() {
    this.authStore.signOut();
  }
}
