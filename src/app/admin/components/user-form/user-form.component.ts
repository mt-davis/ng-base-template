import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="card">
        <div class="card-header">
          <h2>{{ isEditMode ? 'Edit User' : 'Create New User' }}</h2>
          <p class="subtitle">{{ isEditMode ? 'Update user information' : 'Add a new user to the system' }}</p>
        </div>
        
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="form-content">
          <div class="form-grid">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                id="firstName" 
                type="text" 
                formControlName="firstName"
                [class.error]="isFieldInvalid('firstName')"
                placeholder="Enter first name"
              >
              <div class="error-message" *ngIf="isFieldInvalid('firstName')">
                First name is required
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                id="lastName" 
                type="text" 
                formControlName="lastName"
                [class.error]="isFieldInvalid('lastName')"
                placeholder="Enter last name"
              >
              <div class="error-message" *ngIf="isFieldInvalid('lastName')">
                Last name is required
              </div>
            </div>

            <div class="form-group full-width">
              <label for="email">Email Address</label>
              <input 
                id="email" 
                type="email" 
                formControlName="email"
                [class.error]="isFieldInvalid('email')"
                placeholder="Enter email address"
              >
              <div class="error-message" *ngIf="isFieldInvalid('email')">
                <span *ngIf="userForm.get('email')?.errors?.['required']">
                  Email is required
                </span>
                <span *ngIf="userForm.get('email')?.errors?.['email']">
                  Please enter a valid email address
                </span>
              </div>
            </div>

            <div class="form-group">
              <label for="role">Role</label>
              <select 
                id="role" 
                formControlName="role"
                [class.error]="isFieldInvalid('role')"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  formControlName="isActive"
                >
                <span class="checkbox-text">Active User</span>
              </label>
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              class="btn-secondary" 
              (click)="goBack()"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-primary" 
              [disabled]="userForm.invalid || submitting"
            >
              {{ submitting ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 0.5rem 1rem rgba(44, 51, 73, 0.1);
    }

    .card-header {
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #edf1f7;
    }

    .card-header h2 {
      margin: 0;
      color: #222b45;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .subtitle {
      margin: 0.5rem 0 0;
      color: #8f9bb3;
      font-size: 0.875rem;
    }

    .form-content {
      padding: 2rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    label {
      color: #222b45;
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    input, select {
      padding: 0.75rem 1rem;
      border: 1px solid #e4e9f2;
      border-radius: 4px;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    input:focus, select:focus {
      border-color: #3366ff;
      outline: none;
      box-shadow: 0 0 0 3px rgba(51, 102, 255, 0.1);
    }

    input.error, select.error {
      border-color: #ff3d71;
    }

    .error-message {
      color: #ff3d71;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .checkbox-group {
      margin-top: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .checkbox-text {
      margin-left: 0.5rem;
      font-weight: normal;
    }

    input[type="checkbox"] {
      width: 1.25rem;
      height: 1.25rem;
      margin: 0;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #edf1f7;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s;
      border: none;
      cursor: pointer;
    }

    .btn-primary {
      background: #3366ff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1a4bff;
    }

    .btn-primary:disabled {
      background: #c5cee0;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #e4e9f2;
      color: #222b45;
    }

    .btn-secondary:hover {
      background: #c5cee0;
    }
  `]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', [Validators.required]],
      isActive: [true]
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.isEditMode = true;
      this.loadUser(userId);
    }
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (error) => {
        console.error('Error loading user:', error);
        // Handle error (show notification)
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitting = true;
      const userData = this.userForm.value;
      const userId = this.route.snapshot.params['id'];

      const request = this.isEditMode
        ? this.userService.updateUser(userId, userData)
        : this.userService.createUser(userData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/admin/users']);
        },
        error: (error) => {
          console.error('Error saving user:', error);
          this.submitting = false;
          // Handle error (show notification)
        }
      });
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/users']);
  }
} 