import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BankConnectionService {
  constructor(private http: HttpClient) {}

  setupAccount() {
    return this.http.get('http://localhost:3000/connect');
  }
}
