import { Component, OnInit } from '@angular/core';
import {TableService} from "../../services/table.service";
import {Table} from "../../entity/table";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  tables:Table[];
  currentTable:Table;

  constructor(private tableService:TableService) { }

  ngOnInit(): void {
    this.tableService.getAllTables().subscribe(
      res=>{this.tables = res},
      error => {alert("Tables Error")}
    )
  }

  tableSelected(table:Table):void{
    this.currentTable = table;
  }

  updateTable(table: Table) :void{
    table.status = "Free";
    table.user = null;
    table.reservationDate = null;
    this.tableService.updateTable(table).then(
      data=> {
      },
      error=>{alert("Table update error")}
    )
  }
}
