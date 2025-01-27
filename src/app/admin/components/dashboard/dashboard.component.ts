import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DashboardStat {
  title: string;
  value: number;
  change: number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="row">
        <div class="col" *ngFor="let stat of stats">
          <div class="card status-card">
            <div class="status-header">
              <span class="title">{{stat.title}}</span>
              <i class="icon">{{stat.icon}}</i>
            </div>
            <div class="status-content">
              <div class="value">{{stat.value}}</div>
              <div class="delta" [class.up]="stat.change > 0" [class.down]="stat.change < 0">
                <i>{{stat.change > 0 ? '↑' : '↓'}}</i>
                {{Math.abs(stat.change)}}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="activity-list">
                <div class="activity-item" *ngFor="let activity of recentActivity">
                  <div class="activity-icon">{{activity.icon}}</div>
                  <div class="activity-details">
                    <div class="activity-text">{{activity.text}}</div>
                    <div class="activity-time">{{activity.time}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      margin: -1rem;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin: 1rem;
    }

    .col {
      flex: 1;
      padding: 1rem;
      min-width: 300px;
    }

    .col-12 {
      flex: 0 0 100%;
      padding: 1rem;
    }

    .card {
      background: #ffffff;
      border-radius: 0.25rem;
      box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);
    }

    .status-card {
      padding: 1.5rem;
    }

    .status-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .title {
      color: #8f9bb3;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .icon {
      font-size: 1.5rem;
      color: #3366ff;
    }

    .status-content {
      display: flex;
      align-items: baseline;
      gap: 1rem;
    }

    .value {
      font-size: 2rem;
      font-weight: 600;
      color: #222b45;
    }

    .delta {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .delta.up {
      color: #00d68f;
    }

    .delta.down {
      color: #ff3d71;
    }

    .card-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #edf1f7;
    }

    .card-header h5 {
      margin: 0;
      color: #222b45;
      font-weight: 600;
    }

    .card-body {
      padding: 1.5rem;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #edf1f7;
    }

    .activity-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.25rem;
      background: #e7f1ff;
      color: #3366ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .activity-details {
      flex: 1;
    }

    .activity-text {
      color: #222b45;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .activity-time {
      color: #8f9bb3;
      font-size: 0.875rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  Math = Math;
  
  stats: DashboardStat[] = [
    { title: 'Total Users', value: 1234, change: 12.5, icon: '👥' },
    { title: 'Active Users', value: 892, change: 5.2, icon: '✅' },
    { title: 'New Users', value: 38, change: -2.4, icon: '🆕' },
    { title: 'Premium Users', value: 156, change: 8.7, icon: '⭐' }
  ];

  recentActivity = [
    { icon: '👤', text: 'New user registered: John Doe', time: '5 minutes ago' },
    { icon: '✏️', text: 'User profile updated: Jane Smith', time: '15 minutes ago' },
    { icon: '🔑', text: 'Password changed: user123', time: '1 hour ago' },
    { icon: '❌', text: 'Account deactivated: old_user', time: '2 hours ago' },
    { icon: '✅', text: 'Email verified: new_user@example.com', time: '3 hours ago' }
  ];

  ngOnInit() {
    // In a real app, you would fetch data here
  }
} 