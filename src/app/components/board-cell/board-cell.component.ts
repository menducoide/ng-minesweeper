import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GameCell } from "src/app/core/models/game-cell";
import { faBomb, faFlag, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-board-cell",
  templateUrl: "./board-cell.component.html",
  styleUrls: ["./board-cell.component.sass"],
})
export class BoardCellComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;
  @Input() cell: GameCell;
  @Input() iconSize: string ;
  @Input() gameEnded: boolean = false;
  @Input() gameStarted: boolean = false;
  @Output() handleRightClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() handleClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() flags: number;
  faBomb = faBomb;
  faFlag = faFlag;
  faCheck = faCheck;
  faTimes= faTimes;
  colorCell = "";
  fontSize = ""
  constructor() {}
  ngOnInit(): void {
    if (this.cell) {
      this.colorCell = "arround-" + this.cell.arroundBombs;
      this.fontSize = (Number(this.height.replace("px","")) / 2) + "px";
    }
  }
  onCellClick = (e) => {
    if(!this.gameStarted ){
      this.handleClick.emit(this.cell);
    }
    else if ( this.cell.hasFlag || this.cell.selected) {
      e.preventDefault();
    } else {
      this.handleClick.emit(this.cell);
    }
  };
  onCellRightClick = (e) => {
    e.preventDefault();
    if (!this.gameStarted ||this.cell.selected  ) return;
    if (!this.cell.hasFlag && this.flags > 0) {
      this.cell.hasFlag = true;
    } else if (this.cell.hasFlag) {
      this.cell.hasFlag = !this.cell.hasFlag;
    }
    this.handleRightClick.emit({ cell: this.cell });
  };
}
