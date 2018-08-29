import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabReportCommentModalComponent } from './view-lab-report-comment-modal.component';

describe('ViewLabReportCommentModalComponent', () => {
  let component: ViewLabReportCommentModalComponent;
  let fixture: ComponentFixture<ViewLabReportCommentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLabReportCommentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLabReportCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
