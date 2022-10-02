import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajeroComponent } from './cajero/cajero.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/cajero', pathMatch: 'full'
  },
  {
    path: 'cajero', component: CajeroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
