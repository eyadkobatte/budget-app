import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BankConnectionService } from '../clients/bank-connection.service';

@Component({
  standalone: true,
  imports: [RouterModule],
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
