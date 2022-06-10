import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemServiceService } from 'src/app/system-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  message: string = "";

  constructor(
    private usersvc: UserService,
    private router: Router,
    private syssvc: SystemServiceService
  ) { }

  login(): void {
    this.message="";
    this.usersvc.login(this.username, this.password).subscribe({
      next: (res) => {
        console.debug("User", res);
        this.syssvc._user = res;
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        if(err.status == 404){
          this.message = "Username and password is invalid"}
        else {
        console.debug(err);
         }
      }
    });
  }

  ngOnInit(): void {
  }

}
