import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/core/models/menu-item";
import { faBomb , faChartBar} from '@fortawesome/free-solid-svg-icons';
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/core/services/user.service";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.sass"],
})
export class LayoutComponent implements OnInit {
  constructor(private userService : UserService) {}
  title: string;
  menuItems: MenuItem[];
  user : User;
  ngOnInit(): void {
    this.title = "Minesweeper";
    this.menuItems = [
      { url: "board", label: "Play", icon: faBomb },
      { url: "user-analytics", label: "Scores", icon: faChartBar },
     ];
     this.userService.currentUser.subscribe(x => this.user = x as User);
     this.userService.getCurrentUser();
  }
}
