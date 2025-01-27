import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="ngx-admin">
      <nav class="sidebar">
        <div class="logo-container">
          <a class="logo" href="#">
            <span>NGX</span>
            <span class="accent">Admin</span>
          </a>
        </div>
        
        <div class="user-container">
          <div class="user-picture">👤</div>
          <div class="user-details">
            <span class="user-name">Admin User</span>
            <span class="user-title">Administrator</span>
          </div>
        </div>

        <ul class="menu-items">
          <li>
            <a routerLink="./dashboard" routerLinkActive="active">
              <i class="menu-icon">📊</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="./users" routerLinkActive="active">
              <i class="menu-icon">👥</i>
              <span>Users</span>
            </a>
          </li>
          <li>
            <a routerLink="./settings" routerLinkActive="active">
              <i class="menu-icon">⚙️</i>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="main-container">
        <header class="header">
          <div class="header-container">
            <div class="left">
              <span class="current-page">{{getCurrentPage()}}</span>
            </div>
            <div class="right">
              <button class="header-button">
                <i class="icon">🔍</i>
              </button>
              <button class="header-button">
                <i class="icon">🔔</i>
                <span class="badge">5</span>
              </button>
              <button class="header-button">
                <i class="icon">📧</i>
                <span class="badge">2</span>
              </button>
            </div>
          </div>
        </header>

        <div class="content-container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ngx-admin {
      display: flex;
      min-height: 100vh;
      background: #edf1f7;
    }

    .sidebar {
      width: 280px;
      background: #ffffff;
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);
      z-index: 1000;
    }

    .logo-container {
      padding: 1.25rem;
      border-bottom: 1px solid #edf1f7;
    }

    .logo {
      text-decoration: none;
      font-size: 1.75rem;
      font-weight: bold;
      color: #222b45;
    }

    .logo .accent {
      color: #3366ff;
    }

    .user-container {
      padding: 1.25rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #edf1f7;
    }

    .user-picture {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: #3366ff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: #222b45;
    }

    .user-title {
      font-size: 0.875rem;
      color: #8f9bb3;
    }

    .menu-items {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .menu-items li a {
      display: flex;
      align-items: center;
      padding: 1rem 1.25rem;
      color: #222b45;
      text-decoration: none;
      transition: background-color 0.2s;
    }

    .menu-items li a:hover {
      background: #f7f9fc;
    }

    .menu-items li a.active {
      background: #e7f1ff;
      color: #3366ff;
      font-weight: 600;
    }

    .menu-icon {
      margin-right: 1rem;
      font-size: 1.25rem;
    }

    .main-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .header {
      background: #ffffff;
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);
      padding: 1.25rem;
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .current-page {
      font-size: 1.5rem;
      font-weight: 600;
      color: #222b45;
    }

    .header-button {
      background: transparent;
      border: none;
      padding: 0.5rem;
      margin-left: 0.5rem;
      cursor: pointer;
      position: relative;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #ff3d71;
      color: white;
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 1rem;
    }

    .content-container {
      padding: 2rem;
      flex: 1;
    }
  `]
})
export class AdminDashboardComponent {
  getCurrentPage(): string {
    const path = window.location.pathname;
    return path.split('/').pop() || 'Dashboard';
  }
} 