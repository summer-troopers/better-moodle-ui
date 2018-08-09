import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAlertComponent } from './local-alert.component';

describe('LocalAlertComponent', () => {
  let component: LocalAlertComponent;
  let fixture: ComponentFixture<LocalAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
