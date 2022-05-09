import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { ClienteFiltroModel } from '../models/cliente-filtro.model';
import { ClienteService } from '../services/cliente.service';
import * as feather from 'feather-icons';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../../utils/modal-component';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit {

  constructor(private clienteService: ClienteService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    setTimeout(() => {
      feather.replace();
    });
  }

  filtro: ClienteFiltroModel = {
    nomeCompleto: '',
    cpf: ''
  };

  page: number = 1;
  clientes: ClienteModel[] = [];
  total = 0;

  aoPesquisar(page: number = 1) {
    this.clientes = []
    this.clienteService.pesquisar(this.filtro, page).subscribe(response => {
      if (response.body.length) {
        this.clientes = response.body;
        this.total = response.headers.get('X-Total-Count');
        this.page = page;

        setTimeout(() => {
          feather.replace();
        });

      } else
        this.aoExibirAlerta(['Nenhum registro encontrado']);
    });
  }

  aoTrocarPagina(page: any) {
    this.aoPesquisar(page)
  }

  aoExcluir(cliente: ClienteModel) {
    this.clienteService.excluir(cliente.id).subscribe(() => {
      this.aoExibirAlerta(['Cliente excluído com sucesso']);
      this.aoPesquisar();
    });
  }

  aoEditar(clienteId: string) {
    this.router.navigateByUrl(`/cliente/editar/${clienteId}`);
  }

  aoExibirAlerta(mensagens: string[]) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.mensagens = mensagens;
  }
}
