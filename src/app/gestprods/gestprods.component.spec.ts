import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestprodsComponent } from './gestprods.component';

describe('GestprodsComponent', () => {
  let component: GestprodsComponent;
  let fixture: ComponentFixture<GestprodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestprodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestprodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
