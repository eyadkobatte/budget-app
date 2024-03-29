import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bank-connect',
  standalone: true,
  imports: [CommonModule],
  providers: [RouterModule],
  templateUrl: './bank-connect.component.html',
  styleUrl: './bank-connect.component.scss',
})
export class BankConnectComponent {
  display = '';
  constructor(private routerState: ActivatedRoute) {
    const map = routerState.snapshot.queryParamMap;
    map.keys.map((key) => {
      this.display = this.display.concat(
        key,
        ':',
        map.get(key) || 'null',
        ', '
      );
    });
  }
}
