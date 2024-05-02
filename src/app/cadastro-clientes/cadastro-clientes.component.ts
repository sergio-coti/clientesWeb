import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { config } from '../../environments/environment';
import { authHeader } from '../helpers/httpheader-helper';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent implements OnInit {

  //atributos
  planos: any[] = [];
  mensagem: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient
  ) {
  }

  //método executado quando o componente é aberto
  ngOnInit(): void {
    this.httpClient.get(config.apiUrlClientes + '/planos', 
      { headers : authHeader() })
      .subscribe({ //capturando a resposta da API
        next: (data) => { //retorno de sucesso
          this.planos = data as any[]; //armazenando
        },
        error: (e) => { //retorno de erro
          console.log(e);
        }
      })
  }

  //estrutura de formulário
  form = new FormGroup({
    /* campo 'nome' */
    nome : new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    /* campo 'email' */
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    /* campo 'telefone' */
    telefone: new FormControl('', [
      Validators.required, Validators.pattern(/\(\d{2}\)\s\d{5}-\d{4}/)
    ]),
    /* campo 'planoId' */
    planoId: new FormControl('', [
      Validators.required
    ])
  });

  //função para auxiliar a exibição
  //das mensagens de erro de validação
  get f() {
    return this.form.controls;
  }

  //função para capturar o evento
  //SUBMIT do formulário
  onSubmit() : void {
    //enviando uma requisição POST para cadastrar o cliente na API
    this.httpClient.post(config.apiUrlClientes + '/clientes', this.form.value, 
      { responseType: 'text', headers: authHeader() })
      .subscribe({
        next: (data) => {
          this.mensagem = data; //exbir a mensagem obtida da API
          this.form.reset(); //limpar os campos do formulário
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}
