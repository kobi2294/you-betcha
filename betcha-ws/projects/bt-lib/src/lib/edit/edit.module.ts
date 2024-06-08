import { NgModule, Type } from "@angular/core";
import { EditStringComponent } from "./components/edit-string/edit-string.component";
import { EditListComponent } from "./components/edit-list/edit-list.component";
import { ListItemDirective } from "./components/edit-list/list-item.directive";
import { EditPrefixDirective } from "./components/edit-list/edit-prefix.directive";
import { EditSelectComponent } from "./components/edit-select/edit-select.component";
import { SharedModule } from "../shared/shared.module";
import { OptionTemplateDirective } from "./components/edit-select/option-template.directive";

const declareables: Type<any>[] = [
    EditStringComponent, 
    EditListComponent, 
    EditSelectComponent,
    ListItemDirective, 
    EditPrefixDirective, 
    OptionTemplateDirective
]

@NgModule({
    declarations: [
        ...declareables
    ], 
    imports: [
        SharedModule
    ], 
    exports: [
        ...declareables
    ]
})
export class EditModule {

}