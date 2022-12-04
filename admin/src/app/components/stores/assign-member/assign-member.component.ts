import { Component, OnInit, ViewChild } from '@angular/core';
import { deleteField, WithFieldValue } from '@angular/fire/firestore';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, takeWhile } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { Status } from 'src/app/models/status.model';
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
    private snack: MatSnackBar,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeWhile((id) => id !== null),
        mergeMap((id) => this.ss.get(id!))
      )
      .subscribe((store) => {
        this.store = store;
        this.title.setTitle(`${store.name} - 協賛広告ヘルパー`);
      });

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
    // 今割り当てられている人を担当から外す
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
        status: '担当者なし',
        assigned: deleteField(),
      });
    }
  }

  async assignMember(member: Member) {
    if (!this.store) return;
    this.unassign(false);

    // 新しい人を担当にする
    const { assigned, ...partialStore } = this.store;
    member.stores.push(partialStore);
    await this.mems.update(member);
    // storesを除く
    const { stores, ...assignee } = member;
    this.store.assigned = assignee;
    this.store.status = '未着手';
    await this.updateStore(this.store);
  }

  async setStatus(status: Status) {
    if (!this.store) return;
    this.store.status = status;
    await this.updateStore(this.store);
  }

  private async updateStore(data?: WithFieldValue<Store>) {
    if (!data) return;
    try {
      await this.ss.update(data);
    } catch (e) {
      console.error(e);
      this.snack.open('保存できませんでした！');
      return;
    }
    this.snack.open('保存しました');
  }
}
