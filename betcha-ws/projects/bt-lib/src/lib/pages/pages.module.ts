import { NgModule, Type } from "@angular/core";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { LoginUiDirective } from "../standalones/login-ui/login-ui.directive";
import { SharedModule } from "../shared/shared.module";
import { BusyPageComponent } from "./pages/busy-page/busy-page.component";
import { SkFullComponent } from "./skeletons/sk-full/sk-full.component";
import { FullTitleComponent } from "./components/full-title/full-title.component";

const declarations: Type<any>[] = [
    LoginPageComponent, 
    BusyPageComponent, 
    SkFullComponent, 
    FullTitleComponent
];

@NgModule({
    declarations: declarations,
    imports: [SharedModule, LoginUiDirective],
    exports: declarations
})

export class PagesModule {

}