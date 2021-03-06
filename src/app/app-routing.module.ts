import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameBoardComponent } from './views/game-board/game-board.component';


const routes: Routes = [
  {path: 'game-board', component:GameBoardComponent,},
  {path: '**', redirectTo:"game-board",}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
