import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { GameBoard } from "src/app/core/models/game-board";
import { SortableColumn } from "src/app/core/models/sortable-column";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-user-analytics",
  templateUrl: "./user-analytics.component.html",
  styleUrls: ["./user-analytics.component.sass"],
})
export class UserAnalyticsComponent implements OnInit {
  elo: number = 0;
  totalMatches: string = "";
  bestScore: string = "";
  user: User;
  tableData: any[];
  tableHeaders: string[];
  tableSortableCols: SortableColumn[];
  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.user && this.user.games && this.user.games.length > 0) {
      let wins = this.user.games.filter((s) => s.win);
      let defeats = this.user.games.filter((s) => !s.win);
      this.elo =
        defeats.length > 0 ? wins.length / defeats.length : wins.length;
      this.bestScore =
        wins.length > 0
          ? wins
              .sort((a, b) => a.elapsedTime - b.elapsedTime)[0]
              .elapsedTime.toString() + " seconds"
          : "-";
      this.totalMatches = this.user.games.length.toString();

      this.tableData = this.user.games.map((s) => {
        return {
          startTime: this.datePipe.transform(s.start, "MM-dd-yyyy hh:mm a"),
          endTime: this.datePipe.transform(s.start, "MM-dd-yyyy hh:mm a"),
          difficulty: s.difficulty.label,
          difficultyId: s.difficulty.id,
          totalTime: s.elapsedTime.toString() + " sec.",
          elapsedTime : s.elapsedTime, 
          status: s.win ? "Win" : "Defeat",
        };
      }).sort((a,b) => b.difficultyId - a.difficultyId || a.elapsedTime  - b.elapsedTime);
      this.tableHeaders = [
        "startTime",
        "endTime",
        "difficulty",
        "totalTime",
        "status",
      ];
      this.tableSortableCols = [
        { colDef: "startTime", label: "Start Time" },
        { colDef: "endTime", label: "End Time" },
        { colDef: "difficulty", label: "Difficulty" },
        { colDef: "totalTime", label: "Total Time" },
        { colDef: "status", label: "Status" },
      ];
    }
  }
}
