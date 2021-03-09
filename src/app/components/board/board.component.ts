import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GameCell } from "src/app/core/models/game-cell";
import { GameRow } from "src/app/core/models/game-row";
import { GameBoard } from "src/app/core/models/game-board";
import { Difficulty } from "src/app/core/models/difficulty";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"],
})
export class BoardComponent implements OnInit {
  @Input() difficulty: Difficulty;
  @Input() gameBoard: GameBoard;
  @Input() cellWidth: string;
  @Input() iconSize: string;
  @Input() flags: number;
  @Input() gameStarted: boolean = false;
  @Output() handleRightClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();

  boardWidth: number;
  boardHeight: number;
  constructor() {}
  ngOnInit(): void {}
  onRightClick = (cell) => {
    this.handleRightClick.emit({ cell: cell });
  };
  onCellClick = (cell) => {
    this.handleClick.emit({ cell: cell });
  };
}
