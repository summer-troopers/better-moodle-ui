import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStudentsComponent } from './user-students.component';

describe('UserStudentsComponent', () => {
  let component: UserStudentsComponent;
  let fixture: ComponentFixture<UserStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
