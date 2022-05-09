import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteIncluirComponent } from './cliente-incluir/cliente-incluir.component';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';

const routes: Routes = [
  { path: 'cliente-listar', component: ClienteListarComponent },
  { path: 'cliente-incluir', component: ClienteIncluirComponent },
  { path: 'editar/:id', component: ClienteIncluirComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}
