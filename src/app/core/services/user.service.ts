import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserKeyEnum } from '../enum/keys/user-key-enum';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) { }
  public currentUser = new BehaviorSubject<any>([]);

  getCurrentUser() : User {
    let user = this.localStorageService.getItemEncripted<User>(UserKeyEnum.userStored);
    this.currentUser.next(user);
    return user;
  }
  setCurrentUser(user : User) {
    this.localStorageService.setItemEncripted(UserKeyEnum.userStored, user);
    this.currentUser.next(user);
  }
}
