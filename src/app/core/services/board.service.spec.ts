import { TestBed } from "@angular/core/testing";
import { Difficulty } from "../models/difficulty";
import { GameBoard } from "../models/game-board";
import { GameCell } from "../models/game-cell";

import { BoardService } from "./board.service";

describe("BoardService", () => {
  let service: BoardService;
  let difficulty: Difficulty;
  let board: GameBoard;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardService);
    difficulty = {
      xLenght: 8,
      yLenght: 8,
      label: "Beginner",
      id: 1,
      mines: 10,
    };
    board = service.generateGameBoard(difficulty);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should have a valid quantity of cells", () => {
    let totalCells = board.rows.length * board.rows[0].cells.length;
    expect(totalCells).toEqual(difficulty.xLenght * difficulty.yLenght);
  });
  it("should have a valid quantity of mines", () => {
    let totalMines = 0;
    board.rows.map((s) => {
      s.cells.map((c) => {
        if (c.hasBomb) totalMines += 1;
      });
    });
    expect(totalMines).toEqual(difficulty.mines);
  });
  it("shouldn't have a mine", () => {
    let cell : GameCell =  {
      id : 0,
      rowId : 0,
      arroundBombs : 0,
      hasBomb : true,
      hasFlag : false,
      selected : false,
    };
    board = service.generateGameBoard(difficulty,cell); ;
    cell = board.rows[cell.rowId].cells[cell.id]; 
    expect(cell.hasBomb).toBeFalse();
  });
  it("shouldn't have a mine arround", () => {
      let cell : GameCell= board.rows.find(s=> s.cells.some(s=>s.arroundBombs == 0)).cells.find(s=>s.arroundBombs == 0);
      let cells = service.getArroundCells(cell,board)
     expect(cells.some(s=>s.hasBomb)).toBeFalse();
  });

});
