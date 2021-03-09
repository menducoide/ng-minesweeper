import { Component, HostListener, OnInit } from "@angular/core";
import { GameBoard } from "src/app/core/models/game-board";
import { BoardService } from "src/app/core/services/board.service";
import { Difficulty } from "src/app/core/models/difficulty";
import { GameCell } from "src/app/core/models/game-cell";
import { DifficultyService } from "src/app/core/services/difficulty.service";
import { UserService } from "src/app/core/services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../user/user-form/user-form.component";
import { NotifyComponent } from "src/app/components/notify/notify.component";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.sass"],
})
export class GameBoardComponent implements OnInit {
  constructor(
    private boardService: BoardService,
    private difficultyService: DifficultyService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  time: number = 0;
  gameStarted: boolean = false;
  gameBoard: GameBoard;
  difficulties: Difficulty[];
  selectedDifficulty: Difficulty;
  remainingFlags: number;
  cellWidth: string;
  interval;
  totalCells: number = 0;
  iconSize = "";
  ngOnInit(): void {
    this.difficulties = this.difficultyService.getDifficulties();
    this.selectedDifficulty = this.difficulties[0];
    this.gameBoard = this.boardService.generateGameBoard(
      this.selectedDifficulty
    );
    this.iconSize = this.selectedDifficulty.label == "Beginner" ? "2x" : "1x";
    this.cellWidth = this.calculteCellWidth();
    this.remainingFlags = this.selectedDifficulty.mines;
    this.totalCells =
      this.selectedDifficulty.xLenght * this.selectedDifficulty.yLenght;
    let currUser = this.userService.getCurrentUser();
    if (!currUser) {
      this.openUserDialog();
    }
  }

  handleOnClick = () => {
    if (this.gameStarted) {
      this.gameBoard = this.boardService.generateGameBoard(
        this.selectedDifficulty
      );
      this.totalCells =
        this.selectedDifficulty.xLenght * this.selectedDifficulty.yLenght;
      this.time = 0;
      this.pauseTimer();
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
    this.totalCells =
      this.selectedDifficulty.xLenght * this.selectedDifficulty.yLenght;
    this.time = 0;
    this.iconSize = this.selectedDifficulty.label == "Beginner" ? "2x" : "";
  };

  calculteCellWidth = (): string => {
    if (window.innerWidth < window.innerHeight) {
      return (
        (window.innerWidth * 0.63) / this.selectedDifficulty.xLenght + "px"
      );
    } else {
      return (
        (window.innerHeight * 0.63) / this.selectedDifficulty.yLenght + "px"
      );
    }
  };
  handleRightClick = (event: any) => {
    const { cell } = event;
    if (!cell.hasFlag && this.remainingFlags > 0) {
      this.remainingFlags = this.remainingFlags + 1;
      this.totalCells++;
    } else if (cell.hasFlag == true && this.remainingFlags > 0) {
      this.remainingFlags = this.remainingFlags - 1;
      this.totalCells--;
    }
  };
  handleCellClick = (event: any) => {
    let cell: GameCell = event.cell as GameCell;
    if (!this.gameStarted) {
      let gameBoard = this.boardService.generateGameBoard(
        this.selectedDifficulty,
        cell
      );
      cell = gameBoard.rows[cell.rowId].cells[cell.id];
      this.gameBoard = this.boardService.selectArroundCells(cell, gameBoard);
      this.gameStarted = true;
      this.time = 0;
      this.startTimer();
    } else if (cell.hasBomb) {
      this.gameBoard = this.boardService.selectAllCells(this.gameBoard);
      this.pauseTimer();
      this.totalCells = 0;
      this.gameBoard.win = false;
      this.gameBoard.elapsedTime = this.time;
      this.saveFinishedGame();
      this.openNotifyDialog();
    } else {
      this.gameBoard = this.boardService.selectArroundCells(
        cell,
        this.gameBoard
      );
      let totalCells =
        this.selectedDifficulty.xLenght * this.selectedDifficulty.yLenght;
      this.gameBoard.rows.forEach((row) => {
        totalCells -= row.cells.filter((c) => c.hasFlag || c.selected).length;
      });
      this.totalCells = totalCells;
      if (totalCells == 0) {
        this.gameBoard.win = true;
        this.gameBoard.elapsedTime = this.time;
        this.saveFinishedGame();
        this.openNotifyDialog();
      }
    }
  };
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.cellWidth = this.calculteCellWidth();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  openUserDialog = (): void => {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "500px",
      height: "250px",
    });

    dialogRef.afterClosed().subscribe((result) => {});
  };
  openNotifyDialog = () => {
    const dialogRef = this.dialog.open(NotifyComponent, {
      width: "500px",
      height: "250px",
    });
    dialogRef.componentInstance.duration = this.time + " seconds";
    dialogRef.componentInstance.hasWin = this.gameBoard.win
    dialogRef.componentInstance.title = this.gameBoard.win
      ? "Congratulations! You Win!"
      : "Defeat!";
    dialogRef.afterClosed().subscribe((reTry) => {
     
      if (reTry) this.handleOnClick();
    });
  };
  saveFinishedGame = () => {
    let currUser = this.userService.getCurrentUser();
    if(currUser){     
      if(currUser.games){
        currUser.games.push(this.gameBoard);
      }else{
        currUser.games = [this.gameBoard];          
      }
      this.userService.setCurrentUser(currUser);
    }
  }
}
