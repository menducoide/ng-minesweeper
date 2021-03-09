import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.sass']
})
export class NotifyComponent implements OnInit {
  @Input() title : string;
  @Input() hasWin : boolean = true;
  @Input() duration : string;
  @Output() handleOnRetry : EventEmitter<any> = new EventEmitter<any>();
  faCheck = faCheck;
  constructor(  public dialogRef: MatDialogRef<NotifyComponent>) { }

  ngOnInit(): void {
  }

  onReTry = event => {
    this.dialogRef.close(true);
   }
}
