import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request!: Request;
  showVerify: boolean = false;

  constructor(
    private reqsvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  remove(): void {
    this.showVerify = !this.showVerify;
  }

  verify(): void {
    this.reqsvc.remove(this.request.id).subscribe({
      next: (res) => {
        console.debug("Remove");
        this.router.navigateByUrl("/request/list")
      },
      error: (err) => {
        console.debug(err);
      }
    })
  }

  ngOnInit(): void {
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

}
