import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsPageComponent } from './course-details-page.component';

describe('CourseDetailsPageComponent', () => {
  let component: CourseDetailsPageComponent;
  let fixture: ComponentFixture<CourseDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
