import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantEditComponent } from './resturant-edit.component';

describe('ResturantEditComponent', () => {
  let component: ResturantEditComponent;
  let fixture: ComponentFixture<ResturantEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
