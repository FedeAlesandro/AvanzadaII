import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list-component.component.html',
  styleUrls: ['./client-list-component.component.css']
})
export class ClientListComponentComponent implements OnInit {

  @Input()
  clients : Array<Client> = new Array<Client>();

  @Output()
  deleteClientEvent = new EventEmitter<Client>();

  @Output()
  editClientEvent = new EventEmitter<Client>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteClient(client : Client){
    this.deleteClientEvent.emit(client)
  }

  editClient(client : Client){
      this.editClientEvent.emit(client)
  }
}
