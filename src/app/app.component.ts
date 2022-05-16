import { Component } from '@angular/core';
import { ClientDataService } from './shared/services/client-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private clientDataService: ClientDataService) {
    this.clientDataService.getMockData();
  }
}
