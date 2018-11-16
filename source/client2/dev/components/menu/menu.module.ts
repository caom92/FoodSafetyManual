import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { MenuAuditListComponent } from './audit-list/menu-audit-list.component'
import { MenuAuditComponent } from './audit/menu-audit.component'
import { MenuComponent } from './viewer/menu-viewer.component'
import { MenuRoutingModule } from './menu-routing.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    MenuRoutingModule,
    CommonModule
  ],
  declarations: [
    MenuComponent,
    MenuAuditComponent,
    MenuAuditListComponent
  ],
  exports: [
    MenuComponent,
    MenuAuditComponent,
    MenuAuditListComponent
  ]
})

export class MenuModule { }
