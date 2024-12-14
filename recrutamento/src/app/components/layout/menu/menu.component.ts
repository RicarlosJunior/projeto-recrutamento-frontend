import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../services/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule, HttpClientModule],
  providers: [
    LoginService
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  constructor(private loginService: LoginService){}

  sair() {
    this.loginService.sair();
  }

}
