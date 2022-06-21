import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemServiceService } from 'src/app/system-service.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request;
  users!: User[];
  user!: User;

  constructor(
    private syssvc: SystemServiceService,
    private reqsvc: RequestService,
    private router: Router,
    private usersvc: UserService
  ) { }

  save(): void {
    console.debug("B4:", this.request);
    this.reqsvc.create(this.request).subscribe({
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
    this.request.userId = this.syssvc._user!.id;
  }

}
