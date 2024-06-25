import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomService } from 'src/services/custom.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit, AfterViewInit {
  constructor(
    private services: CustomService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.getProductsApiCall(this.pageLimit, 0, '');
  }
  title = 'angularDatasense';
  searchText: any = '';
  displayedColumns: string[] = [
    'n_id',
    'brand',
    'bsize',
    'desc_full',
    'focus_end',
    'launce_date',
    'matnr',
    'model',
    'segment',
    'speed',
    'view',
  ];
  selectedItems: any = [];
  pageSizeOptions: any = [5, 10, 20];
  pageNumber: any = 1;
  pageLimit: any = this.pageSizeOptions[0];
  totalLength: any;
  dropdownList: any = [
    { id: '', itemName: 'All' },
    { id: 'a-z', itemName: 'A-Z' },
    { id: 'z-a', itemName: 'Z-A' },
  ];

  dropdownSettings: any = {
    singleSelection: true,
    text: 'Sort',
    enableSearchFilter: false,
    classes: 'myclass custom-class',
    clearable: false,
    showCheckbox: false,
  };

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getProductsApiCall(limit: number, offset: number, search: string) {
    this.services.getProducts(limit, offset, search).subscribe({
      next: (res: any) => {
        console.log(res, 'result');
        this.dataSource = res.data;
        this.totalLength = res.total_record;
      },
    });
  }
  onSearch(value: any) {
    this.getProductsApiCall(this.pageLimit, 0, this.searchText);
  }
  onItemSelect(event: any) {}
  pageEvent(event: any, paginator: any) {
    console.log(event.pageIndex, event.pageSize);
    this.getProductsApiCall(
      event.pageSize,
      event.pageIndex * event.pageSize,
      this.searchText
    );
  }
  onViewClick(element: any) {
    console.log(element);
    this.router.navigate(['/' + element.n_id], {
      state: { brandData: element },
    });
  }

  nullEmptyCheck(value: any) {
    if (value == '' || value == null) {
      return '-';
    } else {
      return value;
    }
  }
  nullEmptyDateCheck(value: any) {
    if (value == '' || value == null) {
      return '-';
    } else {
      const formattedDate = this.datePipe.transform(value, 'MMMM d, y');
      console.log(formattedDate);
      return formattedDate;
    }
  }
}
