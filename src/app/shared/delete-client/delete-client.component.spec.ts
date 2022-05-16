import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientData } from 'src/app/data/client-data';
import { ClientDataService } from '../services/client-data.service';

import { DeleteClientComponent } from './delete-client.component';

describe('DeleteClientComponent', () => {
  let component: DeleteClientComponent;
  let fixture: ComponentFixture<DeleteClientComponent>;
  let clientDataService: ClientDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteClientComponent ],
      providers: [{provide: ClientDataService, useValue: {clients: new ClientData().data}}, {
        provide: MAT_DIALOG_DATA,
        useValue: {data: {client: {
          id: 1,
          firstName: 'Rutledge',
          lastName: 'Haydock',
          email: 'rhaydock0@bluehost.com',
          phoneNumber: '(585) 4434105'
        }}}
        },
        { provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientComponent);
    clientDataService = TestBed.get(ClientDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete client', () => {
    const originalLength = clientDataService.clients?.length;
    component.deleteClient();
    expect(clientDataService.clients.length).toBeLessThan(originalLength)
  })
});
