import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private auth: Auth, private router: Router) {}

  async logout() {
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }
}
