import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './views/layout/layout.component';
import { MaterialModule } from './shared/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GameBoardComponent } from './views/game-board/game-board.component';
import { BoardComponent } from './components/board/board.component';
import { BoardCellComponent } from './components/board-cell/board-cell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GameBoardComponent,
    BoardComponent,
    BoardCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
