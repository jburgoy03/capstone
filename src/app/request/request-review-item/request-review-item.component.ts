import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../request.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent implements OnInit {

  request!: Request;
  rejectReason: boolean = false;

  constructor(
    private reqsvc: RequestService,
    private route: ActivatedRoute
  ) { }

  approve(req: Request): void {
    this.reqsvc.approve(req.id, req).subscribe({
      next: (res) => {
        console.debug(`Request id:${req.id} approved`);
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  reasonforreject(req: Request): void {
    this.reqsvc.reject(req.id, req).subscribe({
      next: (res) => {
        console.debug(`Request id:${req.id} rejected`);
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  reject(): void {
    this.rejectReason = !this.rejectReason;
  }

  refresh(): void {
    let id: number = +this.route.snapshot.params["id"];
    this.reqsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:", res);
        this.request = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
    ngOnInit(): void {
      this.refresh();
    }

}
