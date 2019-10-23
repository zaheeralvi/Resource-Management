import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridresourceComponent } from './gridresource.component';

describe('GridresourceComponent', () => {
  let component: GridresourceComponent;
  let fixture: ComponentFixture<GridresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
