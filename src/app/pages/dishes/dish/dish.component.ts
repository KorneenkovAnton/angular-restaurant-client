import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Dish} from "../../../entity/dish";
import {DishService} from "../../../services/dish.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {switchMap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @Input() dish: Dish;
  imageUrl: string;
  private BASE_URL = environment.apiURL + "/resto/V1/user/getImage/";

  constructor(private dishService: DishService, private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.imageUrl = this.BASE_URL + this.dish.imagePath;
  }

  onDownloadClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.click()
  }

  uploadFile() {
    let newImageName;
    const fileUpload = this.fileUpload.nativeElement;
    const formData = new FormData();
    formData.append('file', fileUpload.files[0]);

    this.uploadService.upload(formData).pipe(
      switchMap((fileName: string) => {
        this.dish.imagePath = fileName;
        newImageName = fileName;
        return this.dishService.saveDish(this.dish)
      })
    ).subscribe(
      res => {
        console.log(res);
        this.dish.imagePath = this.BASE_URL + res;
      }
    )
  }

  updateDish() {
    console.log(this.dish.type)
    this.dish.imagePath = this.dish.imagePath.replace(this.BASE_URL, "");
    this.dishService.saveDish(this.dish).subscribe(
      res => {
        this.dish.imagePath = this.BASE_URL + this.dish.imagePath
      },
      error => {
        alert("Error on save dish")
      }
    )
  }
}
