import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"; 
import { BoardCellComponent } from "../components/board-cell/board-cell.component";
import { BoardComponent } from "../components/board/board.component";
import { NotifyComponent } from "../components/notify/notify.component";
import { TableComponent } from "../components/table/table.component";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [ 
    BoardComponent,
    BoardCellComponent,
    NotifyComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
   ],
   exports : [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BoardComponent,
    BoardCellComponent,
    NotifyComponent,
    TableComponent,
    DatePipe
   ],
  providers: [DatePipe],
  })
export class SharedModule {}
