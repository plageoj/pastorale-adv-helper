import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { EditStoreComponent } from './edit-store/edit-store.component';

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
    'assigned',
    'status',
    'amount',
    'last',
    'draft',
    'actions',
  ] as (keyof Store | 'actions')[];

  private includeHidden = false;
  private subscription?: Subscription;

  filter;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: StoreService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.filter = new FormControl('');
    this.filter.valueChanges.subscribe(() => this.applyFilter());
  }

  ngOnInit(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.store
      .getAll({ includeHidden: this.includeHidden })
      .subscribe((stores) => {
        this.stores.data = stores;
        this.stores.sort = this.sort;
      });
  }

  updateVisibility(event: MatSlideToggleChange) {
    this.includeHidden = event.checked;
    this.ngOnInit();
  }

  applyFilter() {
    this.stores.filter = this.filter.value?.trim();
  }

  susupendNavigation(event: Event) {
    event.stopPropagation();
  }

  edit(store: Store) {
    this.dialog
      .open<EditStoreComponent, Store, Store>(EditStoreComponent, {
        data: store,
      })
      .afterClosed()
      .subscribe((store) => this.updateStore(store));
  }

  add() {
    this.edit({
      id: this.store.id,
      name: '',
      address: '',
      tel: '',
      status: '担当者なし',
      amount: 0,
      draft: '',
      needAttention: false,
      visible: true,
      altTel: '',
      comment: '',
      notes: '',
    });
  }

  attention(store: Store, event: MatCheckboxChange) {
    store.needAttention = event.checked;
    return this.updateStore(store);
  }

  private async updateStore(data?: Store) {
    if (!data) return;
    try {
      await this.store.update(data);
    } catch (e) {
      console.error(e);
      this.snack.open('保存できませんでした！');
      return;
    }
    this.snack.open('保存しました');
  }
}
