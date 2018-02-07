"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var contatos = [
            { id: 1, nome: 'Fulano', email: 'fulano@gmail.com', telefone: '(00)0000-0000' },
            { id: 2, nome: 'Jose', email: 'jose@gmail.com', telefone: '(00)0000-0000' },
            { id: 3, nome: 'Maria', email: 'maria@gmail.com', telefone: '(00)0000-0000' },
            { id: 4, nome: 'Joao', email: 'joao@gmail.com', telefone: '(00)0000-0000' },
            { id: 5, nome: 'Ana', email: 'ana@gmail.com', telefone: '(00)0000-0000' },
            { id: 6, nome: 'Pedro', email: 'pedro@gmail.com', telefone: '(00)0000-0000' }
        ];
        return { contatos: contatos };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map