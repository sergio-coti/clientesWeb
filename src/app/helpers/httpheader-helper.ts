import { HttpHeaders } from "@angular/common/http";
import { config } from "../../environments/environment";
import { decrypt } from "./crypto-helper";

/*
    Função para retornar um objeto HttpHeader
    contendo um TOKEN JWT autorizado
*/
export function authHeader() : HttpHeaders {

    //ler o token que está gravado na local storage
    const data = localStorage.getItem(config.authToken) as string;
    
    //descriptografar o valor do token
    const token = decrypt(data);

    //criando o cabeçalho das requisições
    const httpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + token
      });

    //retornar o valor
    return httpHeaders;
}