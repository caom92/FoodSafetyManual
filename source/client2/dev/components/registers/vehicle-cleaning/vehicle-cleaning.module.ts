import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { RegisterCommonModule } from '../register-common/register-common.module'
import { VehicleCleaningAddComponent } from './add/vehicle-cleaning-add.component'
import { VehicleCleaningDetailsComponent } from './details/vehicle-cleaning-details.component'
import { RegisterReportGeneratorComponent } from './register-report-generator/register-report-generator.component'
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
    RegisterReportGeneratorComponent,
    VehicleCleaningAddComponent,
    VehicleCleaningDetailsComponent,
    VehicleCleaningViewComponent,
    VehicleCleaningViewRowComponent,
    VehicleCleaningRegisterComponent
  ],
  exports: [
    RegisterReportGeneratorComponent,
    VehicleCleaningAddComponent,
    VehicleCleaningDetailsComponent,
    VehicleCleaningViewComponent,
    VehicleCleaningViewRowComponent,
    VehicleCleaningRegisterComponent
  ]
})

export class VehicleCleaningModule { }
