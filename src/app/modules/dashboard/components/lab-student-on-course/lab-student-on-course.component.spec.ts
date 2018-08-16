import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabStudentOnCourseComponent } from './lab-student-on-course.component';

describe('LabStudentOnCourseComponent', () => {
  let component: LabStudentOnCourseComponent;
  let fixture: ComponentFixture<LabStudentOnCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabStudentOnCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabStudentOnCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
