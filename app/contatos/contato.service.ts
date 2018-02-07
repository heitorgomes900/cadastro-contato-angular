import { Injectable } from "@angular/core";
import { Http, Headers, Response } from '@angular/http';
import { CONTATOS } from "./contatos-mock";
import { Contato } from "./contato.model";
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";

@Injectable()
export class ContatoService {
  
  private contatosUrl: string = 'app/contatos';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){
    
  }
  getContatos(): Promise<Contato[]> {
    return this.http.get(this.contatosUrl)
    .toPromise().then(response => response.json().data as Contato[])
    .catch(this.handleError);
    //return Promise.resolve(CONTATOS);
  }

  private handleError(err: any): Promise<any> {
    return Promise.reject(err.message || err);
  }

  getContato(id: number): Promise<Contato> {
    return this.getContatos().then((contatos: Contato[]) =>
      contatos.find(contato => contato.id === id)
    );
  }
  getContatosSlowly(): Promise<Contato[]> {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    })
      .then(() => console.log("primeiro then"))
      .then(() => this.getContatos());
  }

  create(contato: Contato): Promise<Contato>{
    return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
      .toPromise().then((response: Response) => {return response.json().data as Contato})
      .catch(this.handleError);
  } 
  update(contato: Contato): Promise<Contato>{
    const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
    
    return this.http.put(url, JSON.stringify(contato), {headers: this.headers})
    .toPromise().then(() => {return contato as Contato})
    .catch(this.handleError);
  }
  delete(contato: Contato): Promise<Contato>{
    const url = `${this.contatosUrl}/${contato.id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise().then(() => contato as Contato)
    .catch(this.handleError);
  }

  search(term:string):Observable<Contato[]>{
    return this.http.get(`${this.contatosUrl}/?nome=${term}`).
      map((res: Response) => res.json().data as Contato[]);
  }
}
