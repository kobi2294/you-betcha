import { NgModule, Type } from "@angular/core";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { LoginUiDirective } from "../standalones/login-ui/login-ui.directive";
import { SharedModule } from "../shared/shared.module";
import { BusyPageComponent } from "./components/busy-page/busy-page.component";

const declarations: Type<any>[] = [
    LoginPageComponent, 
    BusyPageComponent
];

@NgModule({
    declarations: declarations,
    imports: [SharedModule, LoginUiDirective],
    exports: declarations
})

export class PagesModule {

}