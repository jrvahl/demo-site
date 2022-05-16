import { Component, Inject, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDataService } from '../services/client-data.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {

  client: Client;
  clientUpdateForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddEditClientComponent>, private formBuilder: FormBuilder, private clientDataService: ClientDataService) { }

  ngOnInit(): void {
    this.client = this.data?.client;
    this.clientUpdateForm = this.formBuilder.group({
      firstName: [this.client?.firstName ?? '', [Validators.required]],
      lastName: [this.client?.lastName ?? '', [Validators.required]],
      email: [this.client?.email ?? '', [Validators.required]],
      phoneNumber: [this.client?.phoneNumber ?? '', [Validators.required]]
    });
  }

  submit() {
    if (this.clientUpdateForm.valid) {
      if (this.client) {
        const index = this.clientDataService?.clients?.findIndex(client => client.id === this.client.id);
        this.clientDataService.clients[index] = {
          id: this.client.id,
          firstName: this.clientUpdateForm.controls['firstName']?.value,
          lastName: this.clientUpdateForm.controls['lastName']?.value,
          email: this.clientUpdateForm.controls['email']?.value,
          phoneNumber: this.clientUpdateForm.controls['phoneNumber']?.value
        };
      } else {
        this.clientDataService.clients.push({
          id: this.clientDataService.clients.length + 1,
          firstName: this.clientUpdateForm.controls['firstName']?.value,
          lastName: this.clientUpdateForm.controls['lastName']?.value,
          email: this.clientUpdateForm.controls['email']?.value,
          phoneNumber: this.clientUpdateForm.controls['phoneNumber']?.value
        })
      }
      
      this.dialogRef.close();
    }
  }

}
