import { Component, HostListener, OnInit } from "@angular/core";
import { GameBoard } from "src/app/core/models/game-board";
import { BoardService } from "src/app/core/services/board.service";
import { Difficulty } from "src/app/core/models/difficulty";
import { GameCell } from "src/app/core/models/game-cell";
import { DifficultyService } from "src/app/core/services/difficulty.service";
import { UserService } from "src/app/core/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../user/user-form/user-form.component";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.sass"],
})
export class GameBoardComponent implements OnInit {
  constructor(private boardService: BoardService, private difficultyService: DifficultyService, private userService: UserService,public dialog: MatDialog) {}
  time: number = 0;
  gameStarted: boolean = false;
  gameBoard: GameBoard;
  difficulties: Difficulty[];
  selectedDifficulty: Difficulty;
  remainingFlags: number;
  cellWidth: string;
  interval;
  ngOnInit(): void {
    this.difficulties = this.difficultyService.getDifficulties();
    this.selectedDifficulty = this.difficulties[0];
    this.gameBoard = this.boardService.generateGameBoard(
      this.selectedDifficulty
    );
    this.cellWidth = this.calculteCellWidth();
    this.remainingFlags = this.selectedDifficulty.mines;
    let currUser = this.userService.getCurrentUser();
    if(!currUser){
      this.openUserDialog();
    }
  }

  handleOnClick = () => {
     if(this.gameStarted){
       this.gameBoard = this.boardService.generateGameBoard( this.selectedDifficulty);
       this.time = 0;
       this.startTimer();
     }
  };
  handleOnChangeDifficulty = (selected: Difficulty) => {
    this.selectedDifficulty = selected;
    this.remainingFlags = this.selectedDifficulty.mines;
    this.gameBoard = this.boardService.generateGameBoard(
      this.selectedDifficulty
    );
    this.cellWidth = this.calculteCellWidth();
  };

  calculteCellWidth = (): string => {
    if (window.innerWidth < window.innerHeight) {
      return (
        (window.innerWidth * 0.75) / this.selectedDifficulty.xLenght + "px"
      );
    } else {
      return (
        (window.innerHeight * 0.75) / this.selectedDifficulty.yLenght + "px"
      );
    }
  };
  handleRightClick = (event: any) => {
    const { cell } = event;
    if (!cell.hasFlag && this.remainingFlags > 0) {
      this.remainingFlags = this.remainingFlags + 1;
    } else if (cell.hasFlag == true && this.remainingFlags > 0) {
      this.remainingFlags = this.remainingFlags - 1;
    }
  };
  handleCellClick = (event: any) => {
    const cell: GameCell = event.cell as GameCell;
    if(!this.gameStarted){     
      let gameBoard =  this.boardService.generateGameBoard(this.selectedDifficulty,cell);
      this.gameBoard = this.boardService.selectArroundCells(cell, gameBoard);
      this.gameStarted = true;
      this.time = 0;
      this.startTimer();
    }
    else if (cell.hasBomb) {
      this.gameBoard = this.boardService.selectAllCells(this.gameBoard);
      this.pauseTimer();
    }else{
      this.gameBoard = this.boardService.selectArroundCells(cell, this.gameBoard);
    }
  };
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.cellWidth = this.calculteCellWidth();
  }

  startTimer() {
    this.interval = setInterval(() => {
     this.time++;
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
   }

   openUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width:'500px',
      height:"250px"
     });

    dialogRef.afterClosed().subscribe(result => {
     });
  }
}
