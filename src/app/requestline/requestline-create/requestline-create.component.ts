import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { RequestLine } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent implements OnInit {

  requestline: RequestLine = new RequestLine();
  products!: Product[];

  constructor(
    private reqlsvc: RequestlineService,
    private router: Router,
    private route: ActivatedRoute,
    private prodsvc: ProductService
  ) { }

  save(): void {
    console.debug("B4:", this.requestline);
    this.reqlsvc.create(this.requestline).subscribe({
      next: (res) => {
        console.debug("Request created");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.prodsvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.products = res
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.requestline.requestId = +this.route.snapshot.params["eid"]
  }

}
