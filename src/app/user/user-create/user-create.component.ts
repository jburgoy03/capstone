import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemServiceService } from 'src/app/system-service.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = new User();

  constructor(
    private usersvc: UserService,
    private router: Router,
    private syssvc: SystemServiceService
  ) { }

  save(): void {
    console.debug("B4:", this.user);
    this.usersvc.create(this.user).subscribe({
      next: (res) => {
        console.debug("User Created");
        this.router.navigateByUrl("/user/list")
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

   get isAdmin(){return this.syssvc._user}


  ngOnInit(): void {
    
  }

}
