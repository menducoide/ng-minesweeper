import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let user : User;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    user = {
      games : [],
      name: "test-user"
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a current user and same that the set user', () => {
    service.setCurrentUser(user);
    let _user = service.getCurrentUser();
    expect(user).toBeTruthy();
    expect(_user).toEqual(user);
  });
});
