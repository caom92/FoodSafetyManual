import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { VehicleCleaningRegisterComponent } from './register/vehicle-cleaning-register.component'

const routes: Routes = [
  {
    path: '',
    component: VehicleCleaningRegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VehicleCleaningRoutingModule { }