 import {AfterViewInit, Component, Input, ViewChild,OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SortableColumn } from 'src/app/core/models/sortable-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements AfterViewInit,OnInit {
  @Input() data : any[];
  @Input() displayedColumns : string[];
  @Input() sortableColumns : SortableColumn[];
  dataSource : MatTableDataSource<any>;
  constructor() { }
  ngOnInit(): void {
    console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data);     
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  

}
