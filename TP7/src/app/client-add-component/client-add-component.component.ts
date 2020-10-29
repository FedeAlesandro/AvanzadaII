import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add-component.component.html',
  styleUrls: ['./client-add-component.component.css']
})
export class ClientAddComponentComponent implements OnInit {

  @Input()
  clients: Array<Client> = new Array<Client>();

  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  address: string;

  @Input()
  client: Client;

  constructor() { }

  ngOnInit(): void {
  }

  addClient() {
    let client = new Client();
    client.clientId =  this.findId();
    client.firstName = this.firstName;
    client.lastName = this.lastName;
    client.dni = this.dni;
    client.email = this.email;
    client.address = this.address;

    this.clients.push(client);
    this.render();
  }

  editClient() {
    if (this.firstName != '')
      this.client.firstName = this.firstName;

    if (this.lastName != '')
      this.client.lastName = this.lastName;

    if (this.dni != '')
      this.client.dni = this.dni;

    if (this.email != '')
      this.client.email = this.email;

    if (this.address != '')
      this.client.address = this.address;

    this.clients[this.clients.indexOf(this.client)] = this.client;
    this.render();
  }

  cancelEditClient() {
    this.render();
  }

  setClient(client: Client) {
    this.client = client;
  }

  private findId(){
    let id: number = 1;

    while (this.clients.find(client => client.clientId === id) != undefined){
      id++;
    }

    return id;
  }

  render() {
    this.client = null;
    this.firstName = '';
    this.lastName = '';
    this.dni = '';
    this.email = '';
    this.address = '';
  }
}
