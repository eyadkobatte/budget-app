import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss',
})
export class NavigationContainerComponent {
  user$ = this.auth.user$;
  constructor(private router: Router, private auth: AuthService) {}

  navigate(link: string) {
    this.router.navigate(['/', link]);
  }

  async login() {
    await this.auth.login();
    this.router.navigate(['home/budget']);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}
