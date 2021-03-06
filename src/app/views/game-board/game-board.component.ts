import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.sass']
})
export class GameBoardComponent implements OnInit {

  constructor() { }
  time :  string = "0"
  started: boolean = false;
  ngOnInit(): void {
  }

  handleOnClick = () => {
    this.started = !this.started;
  }
 
}
