import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from 'src/app/models/store.model';

@Component({
    selector: 'app-edit-store',
    templateUrl: './edit-store.component.html',
    styleUrls: ['./edit-store.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSlideToggleModule,
    ]
})
export class EditStoreComponent {
  storeForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public store: Store,
    private fb: UntypedFormBuilder
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
}
