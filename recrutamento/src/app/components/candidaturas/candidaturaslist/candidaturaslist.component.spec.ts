import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturaslistComponent } from './candidaturaslist.component';

describe('CandidaturaslistComponent', () => {
  let component: CandidaturaslistComponent;
  let fixture: ComponentFixture<CandidaturaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidaturaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
