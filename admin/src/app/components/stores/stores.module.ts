import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UtilModule } from '../util/util.module';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';

@NgModule({
  declarations: [StoresComponent, AssignMemberComponent, EditStoreComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
    StoresRoutingModule,
    MatSortModule,
    MatSnackBarModule,
    UtilModule,
  ],
})
export class StoresModule {}