import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { RequestlineService } from 'src/app/requestline/requestline.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {

  request!: Request;

  constructor(
    private reqsvc: RequestService,
    private reqlsvc: RequestlineService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
  
  delete(line: RequestLine) {
    this.reqlsvc.remove(line.id).subscribe({
      next: (res) => {
        console.debug("Request removed");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  submit(): void {
    this.reqsvc.review(this.request.id, this.request).subscribe({
      next: (res) => {
        console.debug("Request submitted");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
