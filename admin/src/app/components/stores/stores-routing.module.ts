import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { HistoryComponent } from './history/history.component';
import { StoresComponent } from './stores.component';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent,
    title: '広告先',
  },
  {
    path: ':id',
    component: AssignMemberComponent,
  },
  {
    path: ':id/history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
