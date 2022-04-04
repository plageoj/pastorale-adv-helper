import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  stores: MatTableDataSource<Store> = new MatTableDataSource();
  columns = [
    'needAttention',
    'name',
    'address',
    'tel',
    'assigned',
    'status',
    'amount',
    'last',
    'draft',
  ] as (keyof Store)[];

  private includeHidden = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: StoreService) {}

  ngOnInit(): void {
    this.store
      .getAll({ includeHidden: this.includeHidden })
      .subscribe((stores) => {
        this.stores = new MatTableDataSource(stores);
        this.stores.sort = this.sort;
      });
  }

  updateVisibility(event: MatSlideToggleChange) {
    this.includeHidden = event.checked;
    this.ngOnInit();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.stores.filter = value;
  }
}
