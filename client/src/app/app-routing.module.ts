import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoTableComponent } from './components/info-table/info-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/student-directory', pathMatch: 'full' },
  {
    path:'student-directory',
    component: InfoTableComponent
  },
  { path: '**', redirectTo: '/student-directory', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
