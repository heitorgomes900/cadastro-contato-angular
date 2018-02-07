/*Módulo principal (root) */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContatosModule } from './contatos/contatos.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DialogService } from './dialog.service';
import './util/rxjs-extensions';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ContatosModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [DialogService],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}