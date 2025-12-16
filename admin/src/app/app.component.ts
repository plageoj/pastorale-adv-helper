import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signOut, User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatSidenavModule,
      MatToolbarModule,
    ]
})
export class AppComponent {
  open = window.innerWidth > 1024;
  user: User | null = null;

  segment = '';

  constructor(private readonly auth: Auth, private readonly router: Router) {
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
