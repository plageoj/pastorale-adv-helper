import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  store?: Store;
  loading;
  location?: google.maps.LatLng;
  placeId = '';

  constructor(
    private ss: StoreService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private geo: MapGeocoder
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
    this.ss.setStatus(this.store.id, '連絡済み');
    window.open(`tel:${phoneNumber}`);
  }
}
