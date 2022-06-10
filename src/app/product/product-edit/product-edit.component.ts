import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product!: Product;
  vendors!: Vendor[];
  back: boolean = false;

  constructor(
    private prodsvc: ProductService,
    private vendsvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  save(): void {
    console.debug("B4:", this.product);
    this.prodsvc.change(this.product).subscribe({
      next: (res) => {
        console.debug("Product edited");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params["id"];
    this.prodsvc.get(id).subscribe({
      next: (res) => {
        this.back =! this.back;
        console.debug(res);
        this.product = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.vendsvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
