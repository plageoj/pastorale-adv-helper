import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss'],
})
export class EditStoreComponent implements OnInit {
  storeForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public store: Store,
    private fb: FormBuilder
  ) {
    this.storeForm = this.fb.group({
      id: [store.id],
      name: [this.store.name],
      address: [this.store.address],
      tel: [this.store.tel],
      altTel: [this.store.altTel],
      notes: [this.store.notes],
      comment: [this.store.comment],
      visible: [this.store.visible],
    } as { [key in keyof Store]: any });
  }

  ngOnInit(): void {}
}
