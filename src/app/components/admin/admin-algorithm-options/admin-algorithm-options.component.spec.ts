import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlgorithmOptionsComponent } from './admin-algorithm-options.component';

describe('AdminAlgorithmOptionsComponent', () => {
  let component: AdminAlgorithmOptionsComponent;
  let fixture: ComponentFixture<AdminAlgorithmOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlgorithmOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlgorithmOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
