import { Injectable } from '@angular/core';
import { User } from './user/user.class';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {

  _user!: User | null;

  constructor(
    private usersvc: UserService
  ) { }

  get isAdmin(){
    if(this._user == null) {
      return false;
    }
    return this._user.isAdmin;
  }

}