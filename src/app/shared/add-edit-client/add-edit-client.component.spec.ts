import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientData } from 'src/app/data/client-data';
import { ClientDataService } from '../services/client-data.service';

import { AddEditClientComponent } from './add-edit-client.component';

describe('AddEditClientComponent', () => {
  let component: AddEditClientComponent;
  let fixture: ComponentFixture<AddEditClientComponent>;
  let clientDataService: ClientDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditClientComponent ],
      providers: [{provide: ClientDataService, useValue: {clients: new ClientData().data}}, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
        },
        { provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']) }
      ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditClientComponent);
    clientDataService = TestBed.get(ClientDataService);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new client', () => {
    component.clientUpdateForm.controls['firstName'].setValue('Josh');
    component.clientUpdateForm.controls['lastName'].setValue('Vahl');
    component.clientUpdateForm.controls['email'].setValue('test@test.cm');
    component.clientUpdateForm.controls['phoneNumber'].setValue('(555) 555-5555');
    component.submit();
    expect(component.clientUpdateForm.valid).toBeTrue();
    expect(clientDataService.clients?.length).toEqual(118);
  });

  it('should update client', () => {
    component.client = {
      id: 1,
      firstName: 'Rutledge',
      lastName: 'Haydock',
      email: 'rhaydock0@bluehost.com',
      phoneNumber: '(585) 4434105'
    };
    component.clientUpdateForm.controls['firstName'].setValue('Josh');
    component.clientUpdateForm.controls['lastName'].setValue('Vahl');
    component.clientUpdateForm.controls['email'].setValue('test@test.cm');
    component.clientUpdateForm.controls['phoneNumber'].setValue('(555) 555-5555');
    component.submit();
    const client = clientDataService.clients?.find(x => x.id === 1);
    expect(component.clientUpdateForm.valid).toBeTrue();
    expect(client?.firstName).toEqual('Josh');
  });
});
