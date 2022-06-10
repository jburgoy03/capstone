import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();
  vendors!: Vendor[];

  constructor(
    private prodsvc: ProductService,
    private vendsvc: VendorService,
    private router: Router
  ) { }

  save(): void {
    console.debug("B4:", this.product);
    this.prodsvc.create(this.product).subscribe({
      next: (res) => {
        console.debug("Expense created");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.vendsvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
