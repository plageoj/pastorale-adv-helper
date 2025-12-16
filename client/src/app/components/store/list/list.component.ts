import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StatusIconPipe } from 'src/app/pipes/status-icon.pipe';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    RouterLink,
    StatusIconPipe,
  ],
})
export class ListComponent implements OnInit {
  stores?: Observable<Store[]>;

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
    private readonly store: StoreService
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
