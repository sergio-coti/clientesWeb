import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { EdicaoClientesComponent } from './edicao-clientes/edicao-clientes.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ConsultaClientesComponent,
    CadastroClientesComponent,
    EdicaoClientesComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clientesWeb';
}
