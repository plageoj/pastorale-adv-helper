import { DecimalPipe, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GoogleMap, MapGeocoder, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StatusIconPipe } from 'src/app/pipes/status-icon.pipe';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    GoogleMap,
    MapMarker,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NgClass,
    RouterLink,
    StatusIconPipe,
  ],
})
export class DetailComponent {
  store?: Store;
  loading;
  location?: google.maps.LatLng;
  placeId = '';

  constructor(
    private readonly ss: StoreService,
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly geo: MapGeocoder
  ) {
    if (typeof google === 'undefined') {
      this.loading = true;
      this.http
        .jsonp(
          `https://maps.googleapis.com/maps/api/js?key=${environment.firebase.apiKey}`,
          'callback'
        )
        .subscribe(() => {
          this.loading = false;
          this.init();
        });
    } else {
      this.init();
    }
  }

  private init() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        mergeMap((id) => this.ss.get(id!))
      )
      .subscribe((store) => {
        this.store = store;

        this.geo
          .geocode({
            address: store.address,
          })
          .subscribe(({ results }) => {
            const [result] = results;
            this.location = result.geometry.location;
            this.placeId = result.place_id;
          });
      });
  }

  call(phoneNumber?: string) {
    if (!phoneNumber || !this.store) return;
    if (this.store.status === '未着手')
      this.ss.setStatus(this.store.id, '連絡済み');
    window.open(`tel:${phoneNumber}`);
  }
}
