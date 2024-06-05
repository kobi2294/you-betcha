import { CommonModule } from "@angular/common";
import { NgModule, Type } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconSymbolDirective } from "./directives/mat-icon-symbol.directive";
import { DecoBgComponent } from "./components/deco-bg/deco-bg.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AltImageDirective } from "./directives/alt-image.directive";
import { RouterModule } from "@angular/router";
import { NoDoubleClickDirective } from "./directives/no-double-click.directive";

const publicDeclared: Type<any>[] = [
    DecoBgComponent, 
]

const privateDeclared: Type<any>[] = [
]

const privateImports: Type<any>[] = [
]

const publicImports: Type<any>[] = [
    MatIconSymbolDirective, 
    AltImageDirective,
    NoDoubleClickDirective,
    CommonModule, 
    RouterModule,
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatProgressBarModule, 
    MatProgressSpinnerModule
]

@NgModule({
    imports: [...privateImports, ...publicImports],
    declarations: [...privateDeclared, ...publicDeclared],
    exports: [
        ...publicDeclared, 
        ...publicImports
    ]
})
export class SharedModule {

}