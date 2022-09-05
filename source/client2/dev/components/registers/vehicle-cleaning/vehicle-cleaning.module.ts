import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterCommonModule } from '../register-common/register-common.module'
import { VehicleCleaningAddRegisterModalComponent } from './add-modal/vehicle-cleaning-add-modal.component'
import { VehicleCleaningEditRegisterModalComponent } from './edit-modal/vehicle-cleaning-edit-modal.component'
import { VehicleCleaningRegisterComponent } from './register/vehicle-cleaning-register.component'
import { VehicleCleaningRoutingModule } from './vehicle-cleaning-routing.module'
import { VehicleCleaningViewRowComponent } from './view-row/vehicle-cleaning-view-row.component'
import { VehicleCleaningViewComponent } from './view/vehicle-cleaning-view.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    VehicleCleaningRoutingModule,
    RegisterCommonModule,
    CommonModule
  ],
  declarations: [
    VehicleCleaningAddRegisterModalComponent,
    VehicleCleaningEditRegisterModalComponent,
    VehicleCleaningViewComponent,
    VehicleCleaningViewRowComponent,
    VehicleCleaningRegisterComponent
  ],
  exports: [
    VehicleCleaningAddRegisterModalComponent,
    VehicleCleaningEditRegisterModalComponent,
    VehicleCleaningViewComponent,
    VehicleCleaningViewRowComponent,
    VehicleCleaningRegisterComponent
  ],
  entryComponents: [
    VehicleCleaningAddRegisterModalComponent,
    VehicleCleaningEditRegisterModalComponent
  ]
})

export class VehicleCleaningModule { }
