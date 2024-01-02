import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './shopzy/users.component';
import { LockerComponent } from './cars/locker.component';
import { SettingsComponent } from './opal/settings.component';
import { DatabaseComponent } from './database/database.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  {path: 'locker', component: LockerComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'database' , component: DatabaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, UsersComponent, LockerComponent, SettingsComponent, DatabaseComponent]
