import { Component, Input, OnInit } from '@angular/core';
import { GameCell } from 'src/app/core/models/game-cell';
import { GameRow } from 'src/app/core/models/game-row';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
 @Input() xLenght: number;
 @Input() yLenght: number;
 rows : GameRow[];
 boardWidth : number;
 boardHeight : number;
 cellWidth : string;
   constructor() { }
  ngOnInit(): void {
    this.boardWidth = window.innerWidth;
    this.boardHeight = window.innerHeight;
    let cellWidth = 0;
     if(this.boardWidth<this.boardHeight){
      cellWidth = (this.boardWidth * 0.75)/(this.xLenght);
    }else{
      cellWidth = (this.boardHeight * 0.75)/(this.yLenght);
    }
    this.cellWidth = cellWidth + "px"
    console.log(this.boardWidth,this.boardHeight, this.cellWidth)
     let totalCells = 1;
    this.rows = new Array<GameRow>();
    for (let i = 1; i <= this.yLenght; i++) {
      let cells : GameCell[]= new Array<GameCell>();
      for (let j = 1; j <= this.xLenght; j++){
         cells.push({id : totalCells++ , hasBomb : false , hasFlag : false, arroundBombs : 0});
       }
      this.rows.push({id:i, cells:cells});       
    }
   }

}
