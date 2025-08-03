import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { History } from 'src/app/models/history.model';
import { Store } from 'src/app/models/store.model';
import { HistoryService } from 'src/app/services/history.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    standalone: false
})
export class HistoryComponent {
  store?: Store;
  historyItems: History[] = [];

  constructor(
    private hs: HistoryService,
    private route: ActivatedRoute,
    private ss: StoreService
  ) {
    const storeId = this.route.params.pipe(map((p) => p.id));

    storeId.pipe(mergeMap((id) => this.ss.get(id))).subscribe((store) => {
      this.store = store;
    });
    storeId.pipe(mergeMap((id) => this.hs.getAll(id))).subscribe((items) => {
      this.historyItems = items;
    });
  }
}
