import { Injectable } from '@angular/core';
import { User } from './user/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {

  _user!: User | null;

  constructor() { }
}
