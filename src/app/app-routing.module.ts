import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDataComponent } from './shared/client-data/client-data.component';

const routes: Routes = [
  {
    path: 'ClientData',
    component: ClientDataComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'ClientData'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
