import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: false
})
export class ListComponent implements OnInit {
  stores?: Observable<Store[]>;

  constructor(
    private auth: Auth,
    private router: Router,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) this.stores = this.store.list();
    });
  }

  async logout() {
    await signOut(this.auth);
    await this.router.navigateByUrl('/login');
  }
}
