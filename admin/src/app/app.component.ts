import { Component } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  open = window.innerWidth > 1024;
  user: User | null = null;

  segment = '';

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.segment = event.urlAfterRedirects.split('/')[1];
      }
    });
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigateByUrl('/account/login');
  }
}
