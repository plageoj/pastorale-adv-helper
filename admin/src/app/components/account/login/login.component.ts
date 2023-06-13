import { Component, OnInit } from '@angular/core';
import {
  Auth,
  AuthError,
  OAuthProvider,
  getRedirectResult,
  linkWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailCredentials = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private auth: Auth,
    private sb: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
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

  async loginWithEmail() {
    const { email, password } = this.emailCredentials.value;
    if (!email || !password) {
      this.sb.open('メールアドレスとパスワードを入力してください');
      return;
    }
    await signInWithEmailAndPassword(this.auth, email, password).catch(
      (e: AuthError) => {
        if (
          e.code === 'auth/wrong-password' ||
          e.code === 'auth/user-not-found'
        ) {
          this.sb.open('メールアドレスかパスワードが間違っています');
        } else {
          this.sb.open('ログインできませんでした');
        }
      }
    );
    this.router.navigateByUrl('/');
  }
}
