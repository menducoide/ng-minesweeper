import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "src/app/core/services/user.service";
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GameBoard } from "src/app/core/models/game-board";
@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.sass"],
})
export class UserFormComponent implements OnInit {
  constructor(    public dialogRef: MatDialogRef<UserFormComponent>,private fb: FormBuilder, private userService: UserService,@Inject(MAT_DIALOG_DATA) public data: any) {}
  faCheck = faCheck;
  formGroup: FormGroup;
  errors : any ={};

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        userName: ['', [Validators.required]]     
      }
    );
  }
  onSave = () => {
    if (this.formGroup.valid) {
      let user = this.formGroup.value;
      this.userService.setCurrentUser({ name: user.userName, games : null });
      this.dialogRef.close(user.userName);
    }else{
      console.log("invalid")
      this.errors = {
        userName : 'You must enter a value'
      }
    }
  };
}
