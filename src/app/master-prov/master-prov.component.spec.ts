import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProvComponent } from './master-prov.component';

describe('MasterProvComponent', () => {
  let component: MasterProvComponent;
  let fixture: ComponentFixture<MasterProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterProvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
