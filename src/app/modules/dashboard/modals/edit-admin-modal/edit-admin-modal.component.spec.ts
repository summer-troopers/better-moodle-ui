import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminModalComponent } from './edit-admin-modal.component';

describe('EditAdminModalComponent', () => {
  let component: EditAdminModalComponent;
  let fixture: ComponentFixture<EditAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
