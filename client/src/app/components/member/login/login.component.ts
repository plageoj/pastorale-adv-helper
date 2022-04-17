import { Component, OnInit } from '@angular/core';
import {
  Auth,
  AuthError,
  getRedirectResult,
  linkWithRedirect,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: Auth,
    private sb: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await getRedirectResult(this.auth);
    this.router.navigateByUrl('/');
  }

  async login() {
    const provider = new OAuthProvider('microsoft.com');
    await signInWithPopup(this.auth, provider).catch(async (e: AuthError) => {
      if (e.code === 'auth/account-exists-with-different-credential') {
        const { email } = e.customData;
        if (!email) return;
        const studentNumber = email.match(/b(\d+)@/)?.[1];
        if (!studentNumber) return;
        const result = await signInWithEmailAndPassword(
          this.auth,
          email,
          studentNumber
        );
        await linkWithRedirect(result.user, provider);
      } else {
        this.sb.open('ログインできませんでした');
        return;
      }
    });
    this.router.navigateByUrl('/');
  }
}
