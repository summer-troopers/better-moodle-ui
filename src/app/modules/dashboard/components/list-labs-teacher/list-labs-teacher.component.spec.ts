import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLabsTeacherComponent } from './list-labs-teacher.component';

describe('ListLabsTeacherComponent', () => {
  let component: ListLabsTeacherComponent;
  let fixture: ComponentFixture<ListLabsTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListLabsTeacherComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
