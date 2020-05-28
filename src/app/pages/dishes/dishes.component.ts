import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DishService} from "../../services/dish.service";
import {Dish} from "../../entity/dish";
import {DishType} from "../../entity/dish-type";
import {CreateDishDialogComponent} from "./create-dish-dialog/create-dish-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FileUploadService} from "../../services/file-upload.service";
import {switchMap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  public BASE_URL = environment.apiURL + "/resto/V1/user/getImage/";
  dishes: Dish[];
  types: DishType[];
  currentType: DishType;
  currentDish: Dish;

  constructor(private dishService: DishService, public dialog: MatDialog, private uploadService: FileUploadService) {
  }

  ngOnInit() {
    this.dishService.getAllTypes().then(
      res => {
        this.types = res;
        this.types.forEach(t => t.imagePath = this.BASE_URL + t.imagePath)
      }
    );
  }

  getDishByType(type: DishType) {
    this.dishService.getDishByType(type).toPromise().then(
      res => {
        this.dishes = res;
        this.dishes.forEach(d => d.type = type);
      },
      err => {
        console.log(err);
        this.dishes = null;
        alert("No available dishes by type")
      }
    )
  }

  selectType(type: DishType) {
    this.currentType = type;
    this.getDishByType(type);
  }

  private selectDish(dish: Dish) {
    this.currentDish = dish;
  }

  openDialogEvent(): void {
    const dialogRef = this.dialog.open(CreateDishDialogComponent, {
      width: '230px',
      data: {
        id: null,
        name: "New Dish",
        description: "",
        cost: 0,
        availability: true,
        imagePath: "",
        type: this.currentType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ((<Dish>result).cost != 0) {
        (<Dish>result).type = this.currentType;
        this.dishService.saveDish(result).toPromise().then(
          res => {
            console.log("Saveing");
            this.dishes.push(res);
          },
          error => {
            alert("Error on save dish");
          }
        );
      } else {
        alert("Cost must be greater than 0")
      }
    })
  }

  updateTypes(type: DishType) {
    type.imagePath = type.imagePath.replace(this.BASE_URL, "");
    this.dishService.saveType(type).subscribe(res => {
        type.imagePath = this.BASE_URL + type.imagePath;
      },
      error => {
        alert("Error to update Type")
      });
  }

  createType() {
    let newType: DishType = {
      id: null,
      name: "New Type",
      imagePath: ""
    };
    this.types.push(newType);
    this.dishService.saveType(newType).subscribe(res => {
      },
      error => {
        alert("Error to save Type")
      })
  }

  public async uploadFile() {
    let newImageName;
    const formData = new FormData();
    const fileUpload = this.fileUpload.nativeElement;
    formData.append('file', fileUpload.files[0]);

    this.uploadService.upload(formData).pipe(
      switchMap((imageName: string) => {
        this.currentType.imagePath = imageName;
        newImageName = imageName;
        console.log(imageName);
        return this.dishService.saveType(this.currentType)
      })
    ).subscribe(
      res => {
        console.log(res);
        this.currentType.imagePath = this.BASE_URL + newImageName;
        window.location.reload();
      },
      error => {
        alert("File Upload Error");
      }
    )
  }


  onDownloadClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click();
  }
}
