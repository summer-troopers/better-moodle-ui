import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsListForTeacherComponent } from './labs-list-for-teacher.component';

describe('LabsListForTeacherComponent', () => {
  let component: LabsListForTeacherComponent;
  let fixture: ComponentFixture<LabsListForTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabsListForTeacherComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsListForTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
