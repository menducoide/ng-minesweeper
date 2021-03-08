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

  public generateGameBoard(difficulty: Difficulty, cell: GameCell =null): GameBoard {
    let totalCells = difficulty.yLenght * difficulty.yLenght;
    let rows: GameRow[] = new Array<GameRow>();
    const randomMines = new Set<Number>();
    while (randomMines.size !== difficulty.mines) {
      let random = Math.floor(Math.random() * totalCells)
      if(!cell || cell.id != random) {
        randomMines.add(random);
      }
    }

    // let randomMines: number[] = Array.from(
    //   { length: difficulty.mines },
    //   (_, i) => Math.floor(Math.random() * totalCells)
    // );
    let currentCell = 0;
    console.log(randomMines);
    for (let i = 0; i < difficulty.yLenght; i++) {
      let cells: GameCell[] = new Array<GameCell>();
      for (let j = 0; j < difficulty.xLenght; j++) {
        let cell: GameCell = {
          arroundBombs: 0,
          hasBomb: randomMines.has(currentCell),
          hasFlag: false,
          id: j,
          selected: false,
          rowId: i,
        };
        currentCell++;
        cells.push(cell);
      }
      rows.push({ id: i, cells: cells });
    }
    rows.forEach((row, i) => {
      row.cells.forEach((cell, j) => {
        let arroundBombs = 0;
        if (i == 0 && j == 0) {
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;
        } else if (i == 0 && j < difficulty.xLenght - 1) {
          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j + 1].hasBomb ? 1 : 0;
        } else if (i == 0 && j == difficulty.xLenght - 1) {
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
        } else if (i > 0 && i < difficulty.yLenght - 1 && j == 0) {
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j + 1].hasBomb ? 1 : 0;
        } else if (
          i > 0 &&
          i < difficulty.yLenght - 1 &&
          j < difficulty.xLenght - 1
        ) {
          arroundBombs += rows[i - 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j + 1].hasBomb ? 1 : 0;

          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;

          arroundBombs += rows[i + 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j + 1].hasBomb ? 1 : 0;
        } else if (
          i > 0 &&
          i < difficulty.yLenght - 1 &&
          j == difficulty.xLenght - 1
        ) {
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i + 1].cells[j - 1].hasBomb ? 1 : 0;
        }
        if (i == difficulty.yLenght - 1 && j == 0) {
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;
        } else if (i == difficulty.yLenght - 1 && j < difficulty.xLenght - 1) {
          arroundBombs += rows[i - 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j + 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j + 1].hasBomb ? 1 : 0;
        } else if (i == difficulty.yLenght - 1 && j == difficulty.xLenght - 1) {
          arroundBombs += rows[i - 1].cells[j].hasBomb ? 1 : 0;
          arroundBombs += rows[i - 1].cells[j - 1].hasBomb ? 1 : 0;
          arroundBombs += rows[i].cells[j - 1].hasBomb ? 1 : 0;
        }
        cell.arroundBombs = arroundBombs;
      });
    });

    return {
      rows: rows,
      start: new Date(),
      end: null,
      win: false,
      elapsedTime: 0,
      difficultyId : difficulty.id
    };
  }

  public selectArroundCells(cell: GameCell, board: GameBoard): GameBoard {
    let i = cell.rowId;
    let j = cell.id;
    board.rows[i].cells[j].selected = true;
    if (cell.arroundBombs > 0 || cell.hasBomb) {
      return board;
    }
    let yLenght = board.rows.length;
    let xLenght = board.rows[0].cells.length;

    if (i == 0 && j == 0) {
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j + 1].selected = !board.rows[i + 1].cells[j + 1]
        .hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;
    } else if (i == 0 && j < xLenght - 1) {
      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;
      board.rows[i + 1].cells[j - 1].selected = !board.rows[i + 1].cells[j - 1]
        .hasFlag;
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j + 1].selected = !board.rows[i + 1].cells[j + 1]
        .hasFlag;
    } else if (i == 0 && j == xLenght - 1) {
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j - 1].selected = !board.rows[i + 1].cells[j - 1]
        .hasFlag;
      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
    } else if (i > 0 && i < yLenght - 1 && j == 0) {
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j + 1].selected = !board.rows[i - 1].cells[j + 1]
        .hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j + 1].selected = !board.rows[i + 1].cells[j + 1]
        .hasFlag;
    } else if (i > 0 && i < yLenght - 1 && j < xLenght - 1) {
      board.rows[i - 1].cells[j - 1].selected = !board.rows[i - 1].cells[j - 1]
        .hasFlag;
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j + 1].selected = !board.rows[i - 1].cells[j + 1]
        .hasFlag;

      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;

      board.rows[i + 1].cells[j - 1].selected = !board.rows[i + 1].cells[j - 1]
        .hasFlag;
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j + 1].selected = !board.rows[i + 1].cells[j + 1]
        .hasFlag;
    } else if (i > 0 && i < yLenght - 1 && j == xLenght - 1) {
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j - 1].selected = !board.rows[i - 1].cells[j - 1]
        .hasFlag;
      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
      board.rows[i + 1].cells[j].selected = !board.rows[i + 1].cells[j].hasFlag;
      board.rows[i + 1].cells[j - 1].selected = !board.rows[i + 1].cells[j - 1]
        .hasFlag;
    }
    if (i == yLenght - 1 && j == 0) {
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j + 1].selected = !board.rows[i - 1].cells[j + 1]
        .hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;
    } else if (i == yLenght - 1 && j < xLenght - 1) {
      board.rows[i - 1].cells[j - 1].selected = !board.rows[i - 1].cells[j - 1]
        .hasFlag;
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j + 1].selected = !board.rows[i - 1].cells[j + 1]
        .hasFlag;
      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
      board.rows[i].cells[j + 1].selected = !board.rows[i].cells[j + 1].hasFlag;
    } else if (i == yLenght - 1 && j == xLenght - 1) {
      board.rows[i - 1].cells[j].selected = !board.rows[i - 1].cells[j].hasFlag;
      board.rows[i - 1].cells[j - 1].selected = !board.rows[i - 1].cells[j - 1]
        .hasFlag;
      board.rows[i].cells[j - 1].selected = !board.rows[i].cells[j - 1].hasFlag;
    }
    return board;
  }
  selectAllCells(board: GameBoard) {
    board.rows = board.rows.map((row) => {
      row.cells = row.cells.map((cell) => {
        cell.selected = true;
        return cell;
      });
      return row;
    });
    return board;
  }
}
