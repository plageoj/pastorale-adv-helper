import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  stores;

  constructor(
    private auth: Auth,
    private router: Router,
    private store: StoreService
  ) {
    this.stores = this.store.list();
  }

  async logout() {
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }
}
