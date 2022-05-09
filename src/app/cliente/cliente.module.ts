import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortDirective } from '../directives/sort.directive';

import { ClienteIncluirComponent } from './cliente-incluir/cliente-incluir.component';
import { ClienteListarComponent } from './cliente-listar/cliente-listar.component';
import { ClienteRoutingModule } from './cliente-routing.module';

@NgModule({
  declarations: [
    ClienteListarComponent,
    ClienteIncluirComponent,
    SortDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    ClienteRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ]
})
export class ClienteModule { }
