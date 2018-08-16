import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLaboratoriesComponent } from './my-laboratories.component';

describe('MyLaboratoriesComponent', () => {
  let component: MyLaboratoriesComponent;
  let fixture: ComponentFixture<MyLaboratoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLaboratoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLaboratoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
