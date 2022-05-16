import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Logger } from '@nsalaun/ng-logger';
import { Client } from 'src/app/shared/models/client';
import { DeleteClientComponent } from '../delete-client/delete-client.component';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Client>;
  displayColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'edit', 'delete'];
  pageSizeOptions = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public clientDataService: ClientDataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Client>(this.clientDataService.clients);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editRow(client: Client) {
    const originalLength = this.clientDataService?.clients?.length;
    this.dialog.open(AddEditClientComponent, {data: {client: client}}).afterClosed().subscribe({
      next: () => {
        // this is where I would usually call a function on the clientDataService that would call 
        // out to the API to update the data on the backend and then reload the data from that response
        // however, in this case I'll just reload it with the data from the clients array
        this.reloadClientData('Update Completed!', originalLength, client);
        
      },
      error: (err) => {
        this.snackBar.open('Client Update Failed. Please try again later.');
      }
    });
  }

  deleteRow(client: Client) {
    const originalLength = this.clientDataService?.clients?.length;
    this.dialog.open(DeleteClientComponent, {data: {client: client}}).afterClosed().subscribe({
      next: () => {
        // same here
        this.reloadClientData('Client Deleted.', originalLength);
      },
      error: (err) => {
        this.snackBar.open('Client deletion failed.');
      }
    });
  }

  addClient() {
    const originalLength = this.clientDataService?.clients?.length;
    this.dialog.open(AddEditClientComponent).afterClosed().subscribe({
      next: () => {
        // same here
        this.reloadClientData('Client Added!', originalLength);
      },
      error: (err) => {
        this.snackBar.open('Client Addition Failed. Please try again later.');
      }
    });
  }

  private reloadClientData(snackBarMessage: string, originalLength?: number, client?: Client, ) {
    this.dataSource = new MatTableDataSource<Client>(this.clientDataService?.clients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const client2 = this.clientDataService.clients.find(x => x.id === client?.id)
    const updated = client?.firstName !== client2?.firstName ||
                    client?.lastName !== client2?.lastName ||
                    client?.email !== client2?.email ||
                    client?.phoneNumber !== client2?.phoneNumber;
    if (updated || this.clientDataService?.clients?.length !== originalLength) {
      this.snackBar.open(snackBarMessage);
    }
  }

}
