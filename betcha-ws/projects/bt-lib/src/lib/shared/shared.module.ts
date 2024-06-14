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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ScrollingModule } from "@angular/cdk/scrolling";
import {ClipboardModule} from '@angular/cdk/clipboard';
import { BusyComponent } from "./components/busy/busy.component";
import { IconButtonDirective } from "./directives/icon-button.directive";
import { SelectAndFocusDirective } from "./directives/select-and-focus.directive";
import { SelectOnFocusDirective } from "./directives/select-on-focus.directive";
import { FlagComponent } from "./components/flag/flag.component";
import { CountryComponent } from "./components/country/country.component";
import { OnOffPendingButtonComponent } from "./components/on-off-pending-button/on-off-pending-button.component";
import { MatCardModule } from "@angular/material/card";
import { PadPipe } from "./pipes/pad.pipe";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";

const publicDeclared: Type<any>[] = [
    DecoBgComponent, 
    BusyComponent, 
    FlagComponent,
    CountryComponent, 
    OnOffPendingButtonComponent
]

const privateDeclared: Type<any>[] = [
]

const privateImports: Type<any>[] = [
]

const publicImports: Type<any>[] = [
    MatIconSymbolDirective, 
    AltImageDirective,
    NoDoubleClickDirective,
    IconButtonDirective,
    SelectAndFocusDirective, 
    SelectOnFocusDirective,
    PadPipe,
    CommonModule, 
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatProgressBarModule, 
    MatProgressSpinnerModule, 
    MatFormFieldModule, 
    MatSnackBarModule,
    MatInputModule, 
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    ScrollingModule, 
    ClipboardModule
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