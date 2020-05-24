import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Dish} from "../../../entity/dish";

@Component({
  selector: 'app-create-dish-dialog',
  templateUrl: './create-dish-dialog.component.html',
  styleUrls: ['./create-dish-dialog.component.css']
})
export class CreateDishDialogComponent implements OnInit {
  button: any;
  submit: any;

  constructor(public dialogRef: MatDialogRef<CreateDishDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dish) { }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
