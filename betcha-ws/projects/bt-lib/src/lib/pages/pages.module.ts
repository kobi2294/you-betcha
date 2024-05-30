import { CommonModule } from "@angular/common";
import { NgModule, Type } from "@angular/core";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { LoginUiDirective } from "../standalones/login-ui/login-ui.directive";

const declarations: Type<any>[] = [
    LoginPageComponent
];

@NgModule({
    declarations: declarations,
    imports: [CommonModule, LoginUiDirective],
    exports: declarations
})

export class PagesModule {

}