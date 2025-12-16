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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
})
export class LoginComponent implements OnInit {
  private readonly injector = inject(Injector);

  constructor(
    private readonly auth: Auth,
    private readonly sb: MatSnackBar,
    private readonly router: Router
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
    if (!credential?.user.email?.endsWith('@hiroshima-u.ac.jp')) {
      this.sb.open('このメールアドレスではログインできません');
      await signOut(this.auth);
      return;
    }
    this.router.navigateByUrl('/');
  }
}
