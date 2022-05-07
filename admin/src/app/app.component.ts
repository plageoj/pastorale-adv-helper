import { Component } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  open = window.innerWidth > 1024;
  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigateByUrl('/account/login');
  }
}
