import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTeachersComponent } from './top-teachers.component';

describe('TopTeachersComponent', () => {
  let component: TopTeachersComponent;
  let fixture: ComponentFixture<TopTeachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopTeachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
