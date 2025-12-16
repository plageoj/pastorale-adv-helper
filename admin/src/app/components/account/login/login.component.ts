import { Component, inject, Injector, OnInit, runInInjectionContext } from '@angular/core';
import {
  Auth,
  AuthError,
  GoogleAuthProvider,
  getRedirectResult,
  linkWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  private readonly injector = inject(Injector);

  emailCredentials = this.fb.group({
    email: [''],
    password: [''],
  });

  constructor(
    private readonly auth: Auth,
    private readonly sb: MatSnackBar,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    runInInjectionContext(this.injector, () =>
      getRedirectResult(this.auth)
    ).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  async login() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider).catch(
      async (e: AuthError) => {
        if (e.code === 'auth/account-exists-with-different-credential') {
          const { email } = e.customData;
          if (!email) return;
          const studentNumber = RegExp(/[bmd](\d+)@/).exec(email)?.[1];
          if (!studentNumber) return;
          const result = await signInWithEmailAndPassword(
            this.auth,
            email,
            studentNumber
          );
          await linkWithRedirect(result.user, provider);
        } else {
          this.sb.open('ログインできませんでした');
        }
      }
    );
    if (credential?.user.email?.endsWith('@hiroshima-u.ac.jp')) {
      this.router.navigateByUrl('/');
    } else {
      this.sb.open('広大アドレスでログインしてください。');
      signOut(this.auth);
    }
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
