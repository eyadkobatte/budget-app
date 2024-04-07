import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-container.component.html',
  styleUrl: './navigation-container.component.scss',
})
export class NavigationContainerComponent {
  constructor(private router: Router) {}

  navigate(link: string) {
    this.router.navigate(['/', link]);
  }
}
