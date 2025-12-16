import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
})
export class AppComponent {
  signedIn = false;

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.signedIn = user !== null;
    });
  }
}
