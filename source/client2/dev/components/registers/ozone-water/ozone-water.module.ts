import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterCommonModule } from '../register-common/register-common.module'
import { OzoneWaterAddRegisterModalComponent } from './add-modal/ozone-water-add-modal.component'
import { OzoneWaterEditRegisterModalComponent } from './edit-modal/ozone-water-edit-modal.component'
import { OzoneWaterRegisterComponent } from './register/ozone-water-register.component'
import { OzoneWaterRoutingModule } from './ozone-water-routing.module'
import { OzoneWaterViewRowComponent } from './view-row/ozone-water-view-row.component'
import { OzoneWaterViewComponent } from './view/ozone-water-view.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    OzoneWaterRoutingModule,
    RegisterCommonModule,
    CommonModule
  ],
  declarations: [
    OzoneWaterAddRegisterModalComponent,
    OzoneWaterEditRegisterModalComponent,
    OzoneWaterViewComponent,
    OzoneWaterViewRowComponent,
    OzoneWaterRegisterComponent
  ],
  exports: [
    OzoneWaterAddRegisterModalComponent,
    OzoneWaterEditRegisterModalComponent,
    OzoneWaterViewComponent,
    OzoneWaterViewRowComponent,
    OzoneWaterRegisterComponent
  ],
  entryComponents: [
    OzoneWaterAddRegisterModalComponent,
    OzoneWaterEditRegisterModalComponent
  ]
})

export class OzoneWaterModule { }
