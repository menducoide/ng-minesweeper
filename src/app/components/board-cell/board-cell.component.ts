import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GameCell } from "src/app/core/models/game-cell";
import { faBomb, faFlag } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-board-cell",
  templateUrl: "./board-cell.component.html",
  styleUrls: ["./board-cell.component.sass"],
})
export class BoardCellComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;
  @Input() cell: GameCell;
  @Input() iconSize: string = "4x";
  @Input() gameEnded: boolean = false;
  @Output() handleRightClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() flags: number;
  faBomb = faBomb;
  faFlag = faFlag;
  constructor() {}
  ngOnInit(): void {}
  onRightClick = (e) => {
    e.preventDefault();
     if (!this.cell.hasFlag && this.flags > 0) {
      this.cell.hasFlag = true;
    } else if (this.cell.hasFlag) {
      this.cell.hasFlag = !this.cell.hasFlag;
    }
    this.handleRightClick.emit({cell: this.cell});
  };
}
