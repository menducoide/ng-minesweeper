import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const TEST_KEY = "TEST_KEY"
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be null', () => {
    service.setItem(TEST_KEY,TEST_KEY);
    service.removeItem(TEST_KEY);
    let item = service.getItem(TEST_KEY);
    expect(item).toBeNull();
  });
  it('should have value', () => {
    service.setItem(TEST_KEY,TEST_KEY);
    let item = service.getItem(TEST_KEY);
    expect(item).toBeTruthy();
    service.removeItem(TEST_KEY);
  });

});
