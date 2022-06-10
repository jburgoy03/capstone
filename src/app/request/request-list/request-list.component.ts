import { Component, OnInit } from '@angular/core';
import { RequestLine } from 'src/app/requestline/requestline.class';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests!: Request[];
  users!: User[];
  requestlines!: RequestLine[];
  searchCriteria: string = "";
  sortColumn: string = "description";
  sortAsc: boolean = true;

  constructor(
    private reqsvc: RequestService
  ) { }

  ngOnInit(): void {
    this.reqsvc.list().subscribe({
      next: (res) => {
        console.debug("Request:", res);
        this.requests = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
