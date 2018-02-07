/* Componente principal (root) 
Bloco de construção básico do angular
Controla uma view
Associa com o template*/

import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html', 
})
export class AppComponent{

}