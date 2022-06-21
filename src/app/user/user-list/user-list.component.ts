import { Component, OnInit } from '@angular/core';
import { SystemServiceService } from 'src/app/system-service.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: User[];
  searchCriteria: string = "";

  constructor(
    private usersvc: UserService,
    private syssvc: SystemServiceService
  ) { }

  get isAdmin() {
    return this.syssvc._user?.isAdmin
  }

  ngOnInit(): void {
    this.usersvc.list().subscribe({
      next: (res) => {
        console.debug("User:", res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
