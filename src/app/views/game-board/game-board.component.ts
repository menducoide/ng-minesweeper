import { Component, OnInit } from '@angular/core';
import { GameBoard } from 'src/app/core/models/game-board';
import { BoardService } from 'src/app/core/services/board.service';
import { Difficulty } from 'src/app/core/models/difficulty';
import { GameCell } from 'src/app/core/models/game-cell';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.sass']
})
export class GameBoardComponent implements OnInit {

  constructor(private boardService  : BoardService) { }
  time :  string = "0"
  started: boolean = false;
  gameBoard : GameBoard;
  difficulties : Difficulty[];
  selectedDifficulty : Difficulty;
  remainingFlags : number;
  cellWidth : string;
  ngOnInit(): void {
    let id = 1;
    this.difficulties = [
      {xLenght : 8, yLenght : 8 , label : "Beginner", id:id++ ,  mines : 10 },
      {xLenght : 16, yLenght : 16 , label : "Medium", id:id++ ,  mines : 40 },
      {xLenght : 30, yLenght : 16 , label : "Expert", id:id++ ,  mines : 99 },
    ];
    this.selectedDifficulty = this.difficulties[0];
    this.gameBoard = this.boardService.generateGameBoard(this.selectedDifficulty);
    this.cellWidth = this.calculteCellWidth();
    this.remainingFlags = this.selectedDifficulty.mines;
    
  }

  handleOnClick = () => {
    this.started = !this.started;
  }
  handleOnChangeDifficulty = (selected: Difficulty) => {
    this.selectedDifficulty = selected;
    this.gameBoard = this.boardService.generateGameBoard(this.selectedDifficulty);
    this.cellWidth = this.calculteCellWidth();     
  }

  calculteCellWidth = () : string => {
      if(window.innerWidth<window.innerHeight){
      return ((window.innerWidth * 0.75)/(this.selectedDifficulty.xLenght)) + "px";
    }else{
     return (( window.innerHeight * 0.75)/(this.selectedDifficulty.yLenght)) + "px";
    }
  }
  handleRightClick = (event : any) => {
    const {cell} = event;     
    if(!cell.hasFlag && this.remainingFlags > 0){       
       this.remainingFlags = this.remainingFlags +  1;
     }else if(cell.hasFlag == true && this.remainingFlags>0){
      this.remainingFlags = this.remainingFlags - 1;
    }
  }
}
