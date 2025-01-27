import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminDashboardComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UserListComponent },
          { path: 'users/new', component: UserFormComponent },
          { path: 'users/edit/:id', component: UserFormComponent }
        ]
      }
    ])
  ]
})
export class AdminModule { } 