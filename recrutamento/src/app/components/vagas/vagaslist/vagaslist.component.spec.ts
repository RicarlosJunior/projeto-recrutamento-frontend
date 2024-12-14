import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaslistComponent } from './vagaslist.component';

describe('VagaslistComponent', () => {
  let component: VagaslistComponent;
  let fixture: ComponentFixture<VagaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
