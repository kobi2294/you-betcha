import { CommonModule } from "@angular/common";
import { NgModule, Type } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconSymbolDirective } from "./directives/mat-icon-symbol.directive";

const publicDeclared: Type<any>[] = [
    MatIconSymbolDirective
]

const privateDeclared: Type<any>[] = [
]

const privateImports: Type<any>[] = [
]

const publicImports: Type<any>[] = [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule
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