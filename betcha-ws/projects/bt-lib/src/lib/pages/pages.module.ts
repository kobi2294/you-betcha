import { NgModule, Type } from "@angular/core";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginUiDirective } from "../standalones/login-ui/login-ui.directive";
import { SharedModule } from "../shared/shared.module";
import { BusyPageComponent } from "./pages/busy-page/busy-page.component";
import { SkFullComponent } from "./skeletons/sk-full/sk-full.component";
import { FullTitleComponent } from "./components/full-title/full-title.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { ProfilePicComponent } from "./components/profile-pic/profile-pic.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { NavItemComponent } from "./components/nav-bar/nav-item/nav-item.component";
import { SkNavComponent } from "./skeletons/sk-nav/sk-nav.component";
import { SkDialogComponent } from "./skeletons/sk-dialog/sk-dialog.component";
import { SkDialogContentDirective } from "./skeletons/sk-dialog/sk-dialog-content.directive";
import { SkDialogHeaderDirective } from "./skeletons/sk-dialog/sk-dialog-header.directive";
import { HeaderComponent } from "./components/header/header.component";
import { SkDialogActionsComponent } from "./skeletons/sk-dialog/sk-dialog-actions/sk-dialog-actions.component";

const declarations: Type<any>[] = [
    LoginPageComponent, 
    BusyPageComponent, 
    SkFullComponent, 
    SkNavComponent,
    SkDialogComponent, 
    SkDialogActionsComponent, 
    SkDialogContentDirective, 
    SkDialogHeaderDirective,
    FullTitleComponent, 
    ToolbarComponent, 
    ProfilePicComponent, 
    NavBarComponent, 
    NavItemComponent, 
    HeaderComponent
];

@NgModule({
    declarations: declarations,
    imports: [SharedModule, LoginUiDirective],
    exports: declarations
})

export class PagesModule {

}