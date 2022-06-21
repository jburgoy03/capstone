import { Component, OnInit } from '@angular/core';
import { SystemServiceService } from 'src/app/system-service.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  vendors!: Vendor[];
  searchCriteria: string = "";
  sortColumn: string = "description";
  sortAsc: boolean = true;

  constructor(
    private prodsvc: ProductService,
    private syssvc: SystemServiceService
  ) { }

  get isAdmin() {
    return this.syssvc._user?.isAdmin
  }


  ngOnInit(): void {
    this.prodsvc.list().subscribe({
      next: (res) => {
        console.debug("Product:", res);
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
