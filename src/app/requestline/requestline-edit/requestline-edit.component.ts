import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';
import { RequestLine } from '../requestline.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestlineEditComponent implements OnInit {

  requestline!: RequestLine;
  products!: Product[];

  constructor(
    private reqlsvc: RequestlineService,
    private router: Router,
    private route: ActivatedRoute,
    private prodsvc: ProductService
  ) { }

  save(): void {
    console.debug("B4:", this.requestline);
    this.reqlsvc.change(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline edited");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params["id"];
    this.reqlsvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.requestline = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.prodsvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.products = res
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
