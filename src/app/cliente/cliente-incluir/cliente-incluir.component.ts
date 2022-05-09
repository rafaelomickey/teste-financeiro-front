import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { cpf } from 'cpf-cnpj-validator';
import { NgbdModalContent } from '../../utils/modal-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-incluir',
  templateUrl: './cliente-incluir.component.html',
  styleUrls: ['./cliente-incluir.component.css']
})

export class ClienteIncluirComponent implements OnInit {

  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  cliente: ClienteModel = {
    id: '',
    nomeCompleto: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    rendaMensal: '',
    dataCadastro: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cliente.id = id;
      this.clienteService.obter(this.cliente.id).subscribe(ret => {
        this.cliente = ret;
      });
    }
  }

  aoValidarDadosSalvar(): boolean {
    let mensagens = [];
    if (!this.cliente.nomeCompleto.match(/\w+\s+\w/))
      mensagens.push('Cliente deve possuir nome com sobrenome');

    if (!cpf.isValid(this.cliente.cpf))
      mensagens.push('Cpf inválido');

    if (!this.cliente.dataNascimento)
      mensagens.push('Data de nascimento é obrigatorio');
    else {
      const idadeMinima = moment().add(-18, 'years');
      const idadeMaxima = moment().add(-60, 'years');
      const idadeCliente = moment(this.cliente.dataNascimento);

      if (idadeCliente < idadeMaxima || idadeCliente > idadeMinima)
        mensagens.push('Cliente deve possuir mais de 18 anos e menos de 60');
    }

    if (!this.cliente.rendaMensal)
      mensagens.push('Renda mensal é obrigatorio');

    if (!this.cliente.email)
      mensagens.push('E-mail é obrigatorio');
    else {
      if (this.cliente.email.indexOf('@') < 0 || this.cliente.email.indexOf('.com') < 0)
        mensagens.push('E-mail inválido');
    }

    if (mensagens.length > 0) {
      this.aoExibirAlerta(mensagens);
      return false;
    }

    return true;
  }

  aoExibirAlerta(mensagens: string[]) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.mensagens = mensagens;
  }

  aoSalvar() {
    if (this.aoValidarDadosSalvar()) {
      if (this.cliente.id) {
        this.clienteService.atualizar(this.cliente, this.cliente.id).subscribe({
          next: (ret) => {
            this.aoExibirAlerta(['Cliente atualizado com sucesso']);
            this.router.navigateByUrl("/cliente/cliente-listar")
          },
          error: (err) => {
            this.aoExibirAlerta(['Ocorreu um erro']);
          }
        });
      }
      else {
        this.clienteService.incluir(this.cliente).subscribe({
          next: (ret) => {
            this.aoExibirAlerta(['Cliente incluído com sucesso']);
            this.router.navigateByUrl("/cliente/cliente-listar")
          },
          error: (err) => {
            this.aoExibirAlerta(['Ocorreu um erro']);
          }
        });
      }
    }
  }
}
