import { Component, OnInit, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MyCellComponent } from '../my-cell/my-cell.component';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss'],
})
export class AgTableComponent implements OnInit {
  title = 'learn-ag-grid';

  // Row Data: The data to be displayed.
  rowData$!: Observable<any[]>;
  // rowData = [
  //   { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  //   { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  //   { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  // ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    { field: 'mission', cellRenderer: MyCellComponent },
    { field: 'company', rowGroup: true },
    { field: 'location' },
    { field: 'date' },
    { field: 'price' },
    { field: 'successful' },
    { field: 'rocket', rowGroup: true },
  ];

  defaultColDefs: ColDef = { sortable: true, filter: true };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(public http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.rowData$ = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/space-mission-data.json'
    );
  }

  onCellClicked($event: CellClickedEvent<any, any>) {
    console.log($event);
  }

  deselectAll() {
    this.agGrid.api.deselectAll();
  }
}
