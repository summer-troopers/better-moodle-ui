import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeacherModalComponent } from './delete-teacher-modal.component';

describe('DeleteTeacherModalComponent', () => {
  let component: DeleteTeacherModalComponent;
  let fixture: ComponentFixture<DeleteTeacherModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTeacherModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTeacherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
