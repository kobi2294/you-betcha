import { NgModule } from "@angular/core";
import { TableComponent } from "./table.component";
import { ColumnComponent } from "./components/column/column.component";
import { TableCellDirective } from "./directives/table-cell.directive";
import { TableHeaderDirective } from "./directives/table-header.directive";
import { SortArrowComponent } from "./components/sort-arrow/sort-arrow.component";
import { DataRowComponent } from "./components/data-row/data-row.component";
import { ScrollToSelectedDirective } from "./directives/scroll-to-selected.directive";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { SharedModule } from "../shared/shared.module";

const declareables = [
    TableComponent, 
    ColumnComponent, 
    TableCellDirective, 
    TableHeaderDirective,
]

const privates = [
    SortArrowComponent, 
    DataRowComponent, 
    ScrollToSelectedDirective
]

@NgModule({
    declarations: [
        ...declareables, 
        ...privates
    ], 
    imports: [
        CommonModule, 
        SharedModule, 
        ScrollingModule
    ],
    exports: [
        ...declareables
    ]
})
export class TableModule {

}