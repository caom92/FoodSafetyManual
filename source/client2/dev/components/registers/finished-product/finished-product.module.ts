import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterCommonModule } from '../register-common/register-common.module'
import { FinishedProductAddRegisterModalComponent } from './add-modal/finished-product-add-modal.component'
import { FinishedProductEditRegisterModalComponent } from './edit-modal/finished-product-edit-modal.component'
import { FinishedProductRegisterComponent } from './register/finished-product-register.component'
import { FinishedProductRoutingModule } from './finished-product-routing.module'
import { FinishedProductViewRowComponent } from './view-row/finished-product-view-row.component'
import { FinishedProductViewComponent } from './view/finished-product-view.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    FinishedProductRoutingModule,
    RegisterCommonModule,
    CommonModule
  ],
  declarations: [
    FinishedProductAddRegisterModalComponent,
    FinishedProductEditRegisterModalComponent,
    FinishedProductViewComponent,
    FinishedProductViewRowComponent,
    FinishedProductRegisterComponent
  ],
  exports: [
    FinishedProductAddRegisterModalComponent,
    FinishedProductEditRegisterModalComponent,
    FinishedProductViewComponent,
    FinishedProductViewRowComponent,
    FinishedProductRegisterComponent
  ],
  entryComponents: [
    FinishedProductAddRegisterModalComponent,
    FinishedProductEditRegisterModalComponent
  ]
})

export class FinishedProductModule { }
