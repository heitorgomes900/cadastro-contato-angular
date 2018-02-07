import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Contato } from './app/contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        let contatos: Contato[] = [
        {id: 1, nome: 'Fulano', email: 'fulano@gmail.com', telefone: '(00)0000-0000'},
        {id: 2, nome: 'Jose', email: 'jose@gmail.com', telefone: '(00)0000-0000'},
        {id: 3, nome: 'Maria', email: 'maria@gmail.com', telefone: '(00)0000-0000'},
        {id: 4, nome: 'Joao', email: 'joao@gmail.com', telefone: '(00)0000-0000'},
        {id: 5, nome: 'Ana', email: 'ana@gmail.com', telefone: '(00)0000-0000'},
        {id: 6, nome: 'Pedro', email: 'pedro@gmail.com', telefone: '(00)0000-0000'}]

        return {contatos};
    }
}