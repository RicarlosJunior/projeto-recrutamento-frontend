import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasdetailsComponent } from './vagasdetails.component';

describe('VagasdetailsComponent', () => {
  let component: VagasdetailsComponent;
  let fixture: ComponentFixture<VagasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
