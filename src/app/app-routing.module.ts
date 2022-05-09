import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente-routing.module').then(m => m.ClienteRoutingModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
