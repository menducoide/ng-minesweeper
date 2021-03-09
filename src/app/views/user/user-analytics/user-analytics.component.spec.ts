import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserAnalyticsComponent } from './user-analytics.component';

describe('UserAnalyticsComponent', () => {
  let component: UserAnalyticsComponent;
  let fixture: ComponentFixture<UserAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ SharedModule],
      declarations: [ UserAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should not have tableData", () => {
    expect(!component.tableData).toBeTrue();
  });
  it("should have elo equals to zero", () => {
    expect(component.elo == 0).toBeTrue();
  });
 
});
