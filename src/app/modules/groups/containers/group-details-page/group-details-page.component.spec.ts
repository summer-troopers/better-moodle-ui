import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsPageComponent } from './group-details-page.component';

describe('GroupDetailsPageComponent', () => {
  let component: GroupDetailsPageComponent;
  let fixture: ComponentFixture<GroupDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
