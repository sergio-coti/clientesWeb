import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './edicao-clientes/edicao-clientes.component';
import { AutenticarUsuarioComponent } from './autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    /* mapeamento da rota raiz do projeto */
    path: '',
    pathMatch: 'full',
    redirectTo: '/autenticar-usuario',
  },
  {
    path: 'autenticar-usuario',
    component: AutenticarUsuarioComponent,
  },
  {
    path: 'criar-usuario',
    component: CriarUsuarioComponent,
  },
  {
    path: 'clientes-cadastro',
    component: CadastroClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes-consulta',
    component: ConsultaClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes-edicao/:id',
    component: EdicaoClientesComponent,
    canActivate: [AuthGuard],
  },
  // Rota curinga para página não encontrada (404)
  {
    path: '**',
    redirectTo: '/clientes-consulta',
  },
];
