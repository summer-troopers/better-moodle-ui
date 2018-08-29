import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReportCommentModalComponent } from './lab-report-comment-modal.component';

describe('LabReportCommentModalComponent', () => {
  let component: LabReportCommentModalComponent;
  let fixture: ComponentFixture<LabReportCommentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabReportCommentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabReportCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
