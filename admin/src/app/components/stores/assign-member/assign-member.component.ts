import { Component, OnInit, ViewChild } from '@angular/core';
import { deleteField, WithFieldValue } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, takeWhile } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { Store } from 'src/app/models/store.model';
import { MemberService } from 'src/app/services/member.service';
import { StoreService } from 'src/app/services/store.service';
import { EditStoreComponent } from '../edit-store/edit-store.component';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrls: ['./assign-member.component.scss'],
})
export class AssignMemberComponent implements OnInit {
  store?: Store;
  members = new MatTableDataSource<Member>();

  memberColumns: (keyof Member)[] = [
    'studentNumber',
    'name',
    'currentAddress',
    'commute',
    'stores',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private ss: StoreService,
    private mems: MemberService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeWhile((id) => id !== null),
        mergeMap((id) => this.ss.get(id!))
      )
      .subscribe((store) => (this.store = store));

    this.mems.getAll().subscribe((members) => {
      this.members.data = members;
      this.members.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.members.filter = value;
  }

  edit() {
    this.dialog
      .open<EditStoreComponent, Store, Store>(EditStoreComponent, {
        data: this.store,
      })
      .afterClosed()
      .subscribe((store) => this.updateStore(store));
  }

  async unassign(save = true) {
    if (!this.store) return;
    // ??????????????????????????????????????????????????????
    const currentAssignee = this.store.assigned;
    if (currentAssignee) {
      const oldMember = this.members.data.find(
        ({ uid }) => uid === currentAssignee.uid
      );
      if (oldMember) {
        oldMember.stores = oldMember.stores.filter(
          ({ id }) => id !== this.store?.id
        );
        await this.mems.update(oldMember);
      }
    }

    if (save) {
      await this.updateStore({
        ...this.store,
        status: '???????????????',
        assigned: deleteField(),
      });
    }
  }

  async assignMember(member: Member) {
    if (!this.store) return;
    this.unassign(false);

    // ??????????????????????????????
    const { assigned, ...partialStore } = this.store;
    member.stores.push(partialStore);
    await this.mems.update(member);
    // stores?????????
    const { stores, ...assignee } = member;
    this.store.assigned = assignee;
    this.store.status = '?????????';
    await this.updateStore(this.store);
  }

  private async updateStore(data?: WithFieldValue<Store>) {
    if (!data) return;
    try {
      await this.ss.update(data);
    } catch (e) {
      console.error(e);
      this.snack.open('?????????????????????????????????');
      return;
    }
    this.snack.open('??????????????????');
  }
}
