import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCatsComponent } from './display-cats.component';

describe('DisplayCatsComponent', () => {
  let component: DisplayCatsComponent;
  let fixture: ComponentFixture<DisplayCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});