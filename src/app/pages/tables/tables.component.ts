import { Component, OnInit } from '@angular/core';
import {TableService} from "../../services/table.service";
import {Table} from "../../entity/table";
import {ReserveEntity} from "../../entity/reserve-entity";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tables:Table[];
  reserveTable:ReserveEntity[];
  currentReserveTable:ReserveEntity;

  constructor(private tableService:TableService) { }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(
      res=>{this.reserveTable = res},
      error => {alert("Tables Error")}
    )
  }

  tableSelected(table:ReserveEntity):void{
    this.currentReserveTable = table;
  }

  updateTable(table: ReserveEntity) :void{
    this.reserveTable.splice(this.reserveTable.indexOf(table),1);
    this.tableService.updateTable(table.id).subscribe(
      data=> {
        alert(data);
      },
      error=>{alert("Table update error")}
    )
  }
}
