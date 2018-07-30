import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyDetailsPageComponent } from './specialty-details-page.component';

describe('SpecialtyDetailsPageComponent', () => {
  let component: SpecialtyDetailsPageComponent;
  let fixture: ComponentFixture<SpecialtyDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
