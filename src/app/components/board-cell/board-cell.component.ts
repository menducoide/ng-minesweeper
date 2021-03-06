import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.sass']
})
export class BoardCellComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;
  constructor() { }

  ngOnInit(): void {
  }

}
