import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/shared/models/client';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss']
})
export class DeleteClientComponent implements OnInit {
  client: Client;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clientDataService: ClientDataService, private dialogRef: MatDialogRef<DeleteClientComponent>) { }

  ngOnInit(): void {
    this.client = this.data?.client;
  }

  deleteClient() {
    const index = this.clientDataService.clients.findIndex(client => client.id === this.client?.id);
    this.clientDataService.clients.splice(index, 1);
    this.dialogRef.close();
  }
}
