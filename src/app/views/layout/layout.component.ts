import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/core/models/menu-item";
import { faBomb } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.sass"],
})
export class LayoutComponent implements OnInit {
  constructor() {}
  title: string;
  menuItems: MenuItem[];
  ngOnInit(): void {
    this.title = "Minesweeper";
    this.menuItems = [
      { url: "board", label: "Play", icon: faBomb },
     ];
  }
}
