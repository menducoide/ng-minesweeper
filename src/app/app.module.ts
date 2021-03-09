import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./views/layout/layout.component";
import { GameBoardComponent } from "./views/game-board/game-board.component";
import { UserFormComponent } from "./views/user/user-form/user-form.component";
import { UserAnalyticsComponent } from './views/user/user-analytics/user-analytics.component';

import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GameBoardComponent,
    UserFormComponent,
    UserAnalyticsComponent,
 
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
 })
export class AppModule {}

