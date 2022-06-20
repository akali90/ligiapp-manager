import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModInvComponent } from './mod-inv.component';

describe('ModInvComponent', () => {
  let component: ModInvComponent;
  let fixture: ComponentFixture<ModInvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModInvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModInvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
