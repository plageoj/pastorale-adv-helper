import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: 'stores',
    component: StoresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
