import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankConnectionService } from '../clients/bank-connection.service';
import { NavigationContainerComponent } from '../navigation-container/navigation-container.component';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationContainerComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private bankConnectionService: BankConnectionService) {}
  connectBank() {
    this.bankConnectionService.setupAccount().subscribe({
      next: (data) => {
        console.log('got data', data);
      },
      error: (error) => {
        console.error('got error', error);
      },
    });
  }
}
