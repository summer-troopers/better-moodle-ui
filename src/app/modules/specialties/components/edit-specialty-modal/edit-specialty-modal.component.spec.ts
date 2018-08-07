import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialtyModalComponent } from './edit-specialty-modal.component';

describe('EditSpecialtyModalComponent', () => {
  let component: EditSpecialtyModalComponent;
  let fixture: ComponentFixture<EditSpecialtyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpecialtyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialtyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
