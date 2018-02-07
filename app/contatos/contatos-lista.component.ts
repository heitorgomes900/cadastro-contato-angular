import { Component, OnInit } from "@angular/core";
//import { CONTATOS } from './contatos-mock';
import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";
import { DialogService } from "./../dialog.service";

@Component({
  moduleId: module.id,
  selector: "contatos-lista",
  templateUrl: "contatos-lista.component.html",
  providers: [ContatoService]
})
export class ContatosListaComponent implements OnInit {
  contatos: Array<Contato> = [];
  mensagem: {};
  classesCss: {};
  private currentTimeout: any;

  constructor(
    private contatoService: ContatoService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.contatoService
      .getContatos()
      .then((contatos: Contato[]) => {
        this.contatos = contatos;
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDelete(contato: Contato):void {
    this.dialogService
      .confirm("Deseja deletar contato " + contato.nome + "?")
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.contatoService.delete(contato).then((c: Contato) => {
            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
            this.mostrarMensagem({
              tipo:'success',
              texto: 'Contato deletado'});
          }).catch(err => {
            this.mostrarMensagem({
            tipo:'danger',
            texto: 'Contato não foi deletado'});
          });
        }
      });
  }

  private mostrarMensagem(mensagem: {tipo:string, texto: string}):void{
    this.mensagem = mensagem;
    this.montarClasses(mensagem.tipo);
    if(mensagem.tipo != 'danger'){
      if(this.currentTimeout){
        clearTimeout(this.currentTimeout);
      }
      
      this.currentTimeout = setTimeout(() => {
      this.mensagem = undefined;
    }, 3000)};
  }

  private montarClasses(tipo:string): void{
    /*
      {
        'alert': true,
        'alert-success': true,
        'alert-danger': false,
        ...
      }
    */
    this.classesCss = {
      'alert': true,
    };
    this.classesCss['alert-' + tipo] = true;
  }
}
