import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreloaderSpinnerComponent } from './page-preloader-spinner.component';

describe('PagePreloaderSpinnerComponent', () => {
  let component: PagePreloaderSpinnerComponent;
  let fixture: ComponentFixture<PagePreloaderSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePreloaderSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePreloaderSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
