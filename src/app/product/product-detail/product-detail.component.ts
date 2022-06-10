import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  showVerify: boolean = false;

  constructor(
    private prodsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  remove(): void {
    this.showVerify = !this.showVerify;
  }

  verify(): void {
    this.prodsvc.remove(this.product.id).subscribe({
      next: (res) => {
        console.debug("Remove");
        this.router.navigateByUrl("/product/list")
      },
      error: (err) => {
        console.debug(err);
      }
    })
  }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.params["id"];
    this.prodsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Product:", res);
        this.product = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
