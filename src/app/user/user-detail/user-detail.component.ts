import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemServiceService } from 'src/app/system-service.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;
  showVerify: boolean = false;

  constructor(
    private usersvc: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private syssvc: SystemServiceService
  ) { }

  remove(): void {
    this.showVerify = !this.showVerify;
  }

  get isAdmin() {
    return this.syssvc._user?.isAdmin
  }

  verify(): void{
    this.usersvc.remove(this.user.id).subscribe({
      next: (res) => {
        console.debug("Remove");
        this.router.navigateByUrl("/user/list")
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    let id: number = +this.route.snapshot.params["id"];
    this.usersvc.get(id).subscribe({
      next: (res) => {
        console.debug("User:", res);
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
