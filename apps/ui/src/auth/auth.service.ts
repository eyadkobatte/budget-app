import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  user,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private provider = new GoogleAuthProvider();
  user$ = user(this.auth);

  constructor(private auth: Auth) {}

  async login() {
    const result = await signInWithPopup(this.auth, this.provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential;
  }

  async logout() {
    await signOut(this.auth);
  }
}
