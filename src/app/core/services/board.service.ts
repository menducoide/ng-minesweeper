import { Injectable } from "@angular/core";
import { Difficulty } from "../models/difficulty";
import { GameBoard } from "../models/game-board";
import { GameCell } from "../models/game-cell";
import { GameRow } from "../models/game-row";

@Injectable({
  providedIn: "root",
})
export class BoardService {
  constructor() {}

  public generateGameBoard(difficulty: Difficulty): GameBoard {
    let totalCells = difficulty.yLenght * difficulty.yLenght;
    let rows: GameRow[] = new Array<GameRow>();
    const randomMines = new Set<Number>();
    while (randomMines.size !== difficulty.mines) {
      randomMines.add(Math.floor(Math.random() * totalCells));
    }
 
    // let randomMines: number[] = Array.from(
    //   { length: difficulty.mines },
    //   (_, i) => Math.floor(Math.random() * totalCells)
    // );
    console.log(randomMines);
    let totalCellIndex = 0;
    for (let i = 0; i < difficulty.yLenght; i++) {
      let cells: GameCell[] = new Array<GameCell>();
      for (let j = 0; j < difficulty.xLenght; j++) {
        let cell: GameCell = {
          arroundBombs: 0,
          hasBomb: randomMines.has(totalCellIndex),
          hasFlag: false,
          id: totalCellIndex,
          selected: false,
        };
        totalCellIndex++;
        cells.push(cell);
      }
      rows.push({ id: i, cells: cells });
    }
    rows.forEach((row,i)=>{
       row.cells.forEach((cell,j)=>{
          let arroundBombs = 0;
          if(i==0 && j == 0){
            arroundBombs+= rows[i+1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i+1].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j + 1].hasBomb? 1 : 0
          }
          else if(i==0 && j < difficulty.xLenght - 1){
            arroundBombs+= rows[i].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i+1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i+1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j + 1].hasBomb? 1 : 0
          }
          else if(i==0 && j == difficulty.xLenght -1 ){
            arroundBombs+= rows[i+1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i+1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j - 1].hasBomb? 1 : 0
          }
          else if(i>0 && i<  difficulty.yLenght -1 && j==0){
            arroundBombs+= rows[i - 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i - 1].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j + 1].hasBomb? 1 : 0             
          }
          else if(i>0 && i<  difficulty.yLenght -1 && j < difficulty.xLenght - 1){
            arroundBombs+= rows[i - 1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i - 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i - 1].cells[j + 1].hasBomb? 1 : 0

            arroundBombs+= rows[i ].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i ].cells[j + 1].hasBomb? 1 : 0
             
            arroundBombs+= rows[i + 1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j + 1].hasBomb? 1 : 0
          }
          else if(i>0 && i<  difficulty.yLenght -1 && j == difficulty.xLenght - 1){
            arroundBombs+= rows[i - 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i - 1].cells[j -1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j -1].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i + 1].cells[j -1].hasBomb? 1 : 0                     
          }
          if(i==difficulty.yLenght - 1 && j == 0){
            arroundBombs+= rows[i-1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i-1].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j + 1].hasBomb? 1 : 0
          }
          else if(i==difficulty.yLenght - 1 && j < difficulty.xLenght - 1){
            arroundBombs+= rows[i-1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i-1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i - 1].cells[j + 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j + 1].hasBomb? 1 : 0
          }
          else if(i==difficulty.yLenght - 1&& j == difficulty.xLenght -1 ){
            arroundBombs+= rows[i-1].cells[j].hasBomb? 1 : 0
            arroundBombs+= rows[i-1].cells[j - 1].hasBomb? 1 : 0
            arroundBombs+= rows[i].cells[j - 1].hasBomb? 1 : 0
          }
          cell.arroundBombs = arroundBombs;
      })
    })

    return {
      rows: rows,
      start: new Date(),
      end: null,
      win: false,
      elapsedTime: 0,
    };
  }
}
