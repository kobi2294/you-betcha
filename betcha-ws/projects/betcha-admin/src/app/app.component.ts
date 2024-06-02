import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore, PagesModule, SharedModule } from '@lib';
import { ToolBarComponent } from "./components/tool-bar/tool-bar.component";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [],
    imports: [RouterModule, SharedModule, PagesModule, ToolBarComponent, ForbiddenComponent]
})
export class AppComponent {
  authStore = inject(AuthStore)
  user = this.authStore.user;

  logout() {
    this.authStore.signOut();
  }
}
