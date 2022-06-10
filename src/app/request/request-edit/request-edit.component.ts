import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {

  request!: Request;
  users!: User[];
  back: boolean = false;

  constructor(
    private reqsvc: RequestService,
    private usersvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  save(): void {
    console.debug("B4:", this.request);
    this.reqsvc.change(this.request).subscribe({
      next: (res) => {
        console.debug("Request edited");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    let id: number = this.route.snapshot.params["id"];
    this.reqsvc.get(id).subscribe({
      next: (res) => {
        this.back =! this.back;
        console.debug(res);
        this.request = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.usersvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
