import * as CryptoJS from 'crypto-js';

/*
    Chave secreta para criptografar e
    descriptografar os dados
*/
const key = '21db44b8-fc37-4157-9f69-e19e0491a284';

/*
    Função para criptografia de dados
*/
export function encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
}

/*
    Função para descriptografar os dados
*/
export function decrypt(data: string): string {
    return CryptoJS.AES.decrypt(data, key)
        .toString(CryptoJS.enc.Utf8);
}