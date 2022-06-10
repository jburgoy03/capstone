import { Component, OnInit } from '@angular/core';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { SystemServiceService } from 'src/app/system-service.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent implements OnInit {

  requests!: Request[];
  requestline!: RequestLine;
  req!: Request;

  constructor(
    private reqsvc: RequestService,
    private syssvc: SystemServiceService
  ) { }

  ngOnInit(): void {
    this.reqsvc.getReview(this.syssvc._user!.id).subscribe({
      next: (res) => {
        console.debug("Whatever:", res);
        this.requests = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
