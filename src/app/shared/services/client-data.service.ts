import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClientData } from '../../data/client-data';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientDataService {
  clients: Client[]

  constructor() { }

  getMockData() {
    // a function like this is where I would normally call out to an API for data using an
    // HttpClient, but for this demo, I'm just loading it from a pre-created class
    return this.clients = new ClientData().data;
  }


}
