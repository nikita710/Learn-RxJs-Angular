import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: any;

  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get('https://dummyjson.com/products?limit=10')
      .subscribe((data) => {
        this.productList = data;
        this.productList = this.productList.products;
        console.log(this.productList);
      });
  }
}
