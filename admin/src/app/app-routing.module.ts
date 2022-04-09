import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './components/members/members.component';
import { AssignMemberComponent } from './components/stores/assign-member/assign-member.component';
import { StoresComponent } from './components/stores/stores.component';

const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: 'stores',
    children: [
      {
        path: '',
        component: StoresComponent,
      },
      {
        path: ':id',
        component: AssignMemberComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
