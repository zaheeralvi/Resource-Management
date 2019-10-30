import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypinsComponent } from './mypins.component';

describe('MypinsComponent', () => {
  let component: MypinsComponent;
  let fixture: ComponentFixture<MypinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
