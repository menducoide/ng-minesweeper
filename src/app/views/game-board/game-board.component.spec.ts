import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from '../user/user-form/user-form.component';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [ SharedModule],
      declarations: [ GameBoardComponent, UserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have board', () => {
    expect(component.gameBoard).toBeTruthy();
  });
  it('should be time equals to zero', () => {
    expect(component.time == 0).toBeTrue();
  });
  it('should have difficulties', () => {
    expect(component.difficulties.some(s=>s)).toBeTrue();
  });
});
