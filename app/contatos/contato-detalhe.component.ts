import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { ContatoService } from "./contato.service";
import { Contato } from "./contato.model";

@Component({
  moduleId: module.id,
  selector: "contato-detalhe",
  templateUrl: "contato-detalhe.component.html"
})
export class ContatoDetalheComponent {
  contato: Contato;
  private isNew: boolean = true;

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("on init");
    this.contato = new Contato(0, "", "", ""); //se o contato não for inicializado, ele dará undefined
    this.route.params.forEach((params: Params) => {
      let id: number = +params["id"];
      console.log(id);
      if (id) {
        this.isNew = false;
        this.contatoService.getContato(id).then((contato: Contato) => {
          this.contato = contato;
        });
      }
    });
  }
  getFormGroupClass(isPristine: boolean, isValid: boolean): {} {
      return {
        'form-group': true, 
        'has-danger': !isValid && !isPristine, 
        'has-success': isValid  && !isPristine
      }
  }
  getFormControlClass(isPristine: boolean, isValid: boolean): {} {
    return {
      'form-control': true, 
      'form-control-danger': !isValid && !isPristine, 
      'form-control-success': isValid  && !isPristine
    }
  }
  onSubmit():void{
    let promise;

    if (this.isNew) {
      promise = this.contatoService.create(this.contato);
    }else {
      promise = this.contatoService.update(this.contato);
    }

    promise.then(contato => this.goBack());
  }

  goBack():void{
    this.location.back()
  }
}
