import { ClienteModel } from '../models/cliente.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteFiltroModel } from '../models/cliente-filtro.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }

  incluir(cliente: ClienteModel): Observable<any> {
    cliente.id = this.newGuid()
    cliente.dataCadastro = new Date().toISOString();
    return this.http.post(`${environment.clienteApi}`, cliente);
  }

  atualizar(cliente: ClienteModel, clienteId: string): Observable<any> {
    return this.http.put(`${environment.clienteApi}/${clienteId}`, cliente);
  }

  obter(id: string): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${environment.clienteApi}/${id}`);
  }

  pesquisar(cliente: ClienteFiltroModel, page: number): Observable<any> {

    let parametros = new HttpParams();

    parametros = parametros.append("_limit", 4);
    parametros = parametros.append("_page", page);

    if (cliente.nomeCompleto) parametros = parametros.append("nomeCompleto", cliente.nomeCompleto);
    if (cliente.cpf) parametros = parametros.append("cpf", cliente.cpf);

    return this.http.get(`${environment.clienteApi}`, {
      params: parametros,
      observe: 'response'
    });
  }

  excluir(id: string) {
    return this.http.delete(`${environment.clienteApi}/${id}`)
  }
  
  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
