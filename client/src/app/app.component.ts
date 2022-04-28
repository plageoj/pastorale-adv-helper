import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  signedIn = false;

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      this.signedIn = user !== null;
    });
  }
}
