import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-list">
      <header class="header">
        <h1>Users</h1>
        <div class="actions">
          <button (click)="addUser()" class="btn-primary">Add User</button>
        </div>
      </header>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{user.firstName}} {{user.lastName}}</td>
              <td>{{user.email}}</td>
              <td>
                <span class="badge" [class.badge-admin]="user.role === 'admin'">
                  {{user.role}}
                </span>
              </td>
              <td>
                <span class="badge" [class.badge-active]="user.isActive" [class.badge-inactive]="!user.isActive">
                  {{user.isActive ? 'Active' : 'Inactive'}}
                </span>
              </td>
              <td class="actions-cell">
                <button (click)="editUser(user)" class="btn-icon">✏️</button>
                <button (click)="deleteUser(user)" class="btn-icon">🗑️</button>
              </td>
            </tr>
            <tr *ngIf="loading">
              <td colspan="5" class="loading">Loading users...</td>
            </tr>
            <tr *ngIf="!loading && users.length === 0">
              <td colspan="5" class="no-data">No users found</td>
            </tr>
          </tbody>
        </table>

        <div class="pagination" *ngIf="totalPages > 1">
          <button 
            [disabled]="currentPage === 1"
            (click)="changePage(currentPage - 1)"
            class="btn-secondary"
          >
            Previous
          </button>
          <span>Page {{currentPage}} of {{totalPages}}</span>
          <button 
            [disabled]="currentPage === totalPages"
            (click)="changePage(currentPage + 1)"
            class="btn-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 1rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      margin-right: 0.5rem;
      cursor: pointer;
    }
    .btn-danger {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-icon {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
    .badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }
    .badge-admin {
      background: #007bff;
      color: white;
    }
    .badge-active {
      background: #28a745;
      color: white;
    }
    .badge-inactive {
      background: #dc3545;
      color: white;
    }
    .loading {
      text-align: center;
    }
    .no-data {
      text-align: center;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;
        this.currentPage = response.pagination.page;
        this.totalPages = response.pagination.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  addUser() {
    this.router.navigate(['/admin/users/new']);
  }

  editUser(user: User) {
    this.router.navigate(['/admin/users/edit', user.id]);
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUser(user.id!).subscribe(() => {
        this.loadUsers();
      });
    }
  }
} 