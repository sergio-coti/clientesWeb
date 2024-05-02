import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../environments/environment';
import { authHeader } from '../helpers/httpheader-helper';

@Component({
  selector: 'app-edicao-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edicao-clientes.component.html',
  styleUrl: './edicao-clientes.component.css',
})
export class EdicaoClientesComponent implements OnInit {

  //atributos
  planos: any[] = [];
  mensagem: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  //estrutura de formulário
  form = new FormGroup({
    /* campo 'id' */
    id: new FormControl(''),
    /* campo 'nome' */
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    /* campo 'email' */
    email: new FormControl('', [Validators.required, Validators.email]),
    /* campo 'telefone' */
    telefone: new FormControl('', [
      Validators.required,
      Validators.pattern(/\(\d{2}\)\s\d{5}-\d{4}/),
    ]),
    /* campo 'planoId' */
    planoId: new FormControl('', [Validators.required]),
  });

  //função auxiliar para exibir as mensagens de validação
  get f() {
    return this.form.controls;
  }

  //método executado quando o componente é aberto
  ngOnInit(): void {

    //consultar os planos
    this.httpClient.get(config.apiUrlClientes + '/planos', 
      { headers: authHeader() })
      .subscribe({ //capturando a resposta da API
        next: (data) => { //retorno de sucesso
          this.planos = data as any[]; //armazenando
        },
        error: (e) => { //retorno de erro
          console.log(e);
        }
      })

    //capturar o id enviado pela URL
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //consultando o cliente através do ID na API
    this.httpClient.get(config.apiUrlClientes + '/clientes/' + id, 
    { headers: authHeader() })
    .subscribe({
      next: (data: any) => {
        //preenchendo o formulário com os dados do cliente
        this.form.controls['id'].setValue(data.id);
        this.form.controls['nome'].setValue(data.nome);
        this.form.controls['email'].setValue(data.email);
        this.form.controls['telefone'].setValue(data.telefone);
        this.form.controls['planoId'].setValue(data.plano.id);
      },
      error: (e) => {
        console.log(e.erro);
      },
    });
  }

  //função para capturar o submit do formulário
  onSubmit() : void {
    //enviando a requisição para atualizar o cliente
    this.httpClient.put(config.apiUrlClientes + "/clientes", this.form.value, 
      { responseType: 'text', headers: authHeader() })
      .subscribe({
        next: (data) => {
          this.mensagem = data;
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }

}
