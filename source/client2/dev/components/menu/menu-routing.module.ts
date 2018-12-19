import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MenuAuditListComponent } from './audit-list/menu-audit-list.component'
import { MenuAuditComponent } from './audit/menu-audit.component'
import { MenuComponent } from './viewer/menu-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'audit/:user_id',
    component: MenuAuditComponent
  },
  {
    path: 'audit-list',
    component: MenuAuditListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MenuRoutingModule { }