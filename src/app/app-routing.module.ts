import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './views/game-board/game-board.component';
import { UserAnalyticsComponent } from './views/user/user-analytics/user-analytics.component';


const routes: Routes = [
  {path: 'game-board', component:GameBoardComponent},
  {path: 'user-analytics', component: UserAnalyticsComponent},
  {path: '**', redirectTo:"game-board",}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
