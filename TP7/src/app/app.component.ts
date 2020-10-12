import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClientAddComponentComponent } from './client-add-component/client-add-component.component';
import { Client } from './models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP 07';
  clients = new Array<Client>();
  client = new Client();

  @ViewChild(ClientAddComponentComponent) clientAddComponent:ClientAddComponentComponent;

  deleteSelectedClient(client: Client) {
    this.clients.splice(this.clients.indexOf(client), 1);
  }

  editClient(client: Client) {
    this.clientAddComponent.setClient(client)
  }
}
