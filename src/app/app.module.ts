import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutComponent } from "./views/layout/layout.component";
import { MaterialModule } from "./shared/material.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GameBoardComponent } from "./views/game-board/game-board.component";
import { BoardComponent } from "./components/board/board.component";
import { BoardCellComponent } from "./components/board-cell/board-cell.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserFormComponent } from "./views/user/user-form/user-form.component";
import { UserStatisticsComponent } from "./views/user/user-statistics/user-statistics.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GameBoardComponent,
    BoardComponent,
    BoardCellComponent,
    UserFormComponent,
    UserStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
 })
export class AppModule {}
