import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosdetailsComponent } from './usuariosdetails.component';

describe('UsuariosdetailsComponent', () => {
  let component: UsuariosdetailsComponent;
  let fixture: ComponentFixture<UsuariosdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
