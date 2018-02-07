"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var contato_service_1 = require("./contato.service");
var dialog_service_1 = require("./../dialog.service");
var ContatosListaComponent = (function () {
    function ContatosListaComponent(contatoService, dialogService) {
        this.contatoService = contatoService;
        this.dialogService = dialogService;
        this.contatos = [];
    }
    ContatosListaComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.contatoService
            .getContatos()
            .then(function (contatos) {
            _this.contatos = contatos;
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ContatosListaComponent.prototype.onDelete = function (contato) {
        var _this = this;
        this.dialogService
            .confirm("Deseja deletar contato " + contato.nome + "?")
            .then(function (canDelete) {
            if (canDelete) {
                _this.contatoService.delete(contato).then(function (c) {
                    _this.contatos = _this.contatos.filter(function (c) { return c.id != contato.id; });
                    _this.mostrarMensagem({
                        tipo: 'success',
                        texto: 'Contato deletado'
                    });
                }).catch(function (err) {
                    _this.mostrarMensagem({
                        tipo: 'danger',
                        texto: 'Contato não foi deletado'
                    });
                });
            }
        });
    };
    ContatosListaComponent.prototype.mostrarMensagem = function (mensagem) {
        var _this = this;
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
            }
            this.currentTimeout = setTimeout(function () {
                _this.mensagem = undefined;
            }, 3000);
        }
        ;
    };
    ContatosListaComponent.prototype.montarClasses = function (tipo) {
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
    };
    return ContatosListaComponent;
}());
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "contatos-lista",
        templateUrl: "contatos-lista.component.html",
        providers: [contato_service_1.ContatoService]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map