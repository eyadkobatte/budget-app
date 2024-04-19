import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationContainerComponent } from '../navigation-container/navigation-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
