import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpecialtiesComponent } from './my-specialties.component';

describe('MySpecialtiesComponent', () => {
  let component: MySpecialtiesComponent;
  let fixture: ComponentFixture<MySpecialtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpecialtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
