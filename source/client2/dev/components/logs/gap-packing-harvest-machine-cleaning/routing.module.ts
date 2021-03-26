import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingHarvestMachineCleaningAuthorizationComponent } from './authorization/gap-packing-harvest-machine-cleaning-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingHarvestMachineCleaningAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPPackingHarvestMachineCleaningAuthorizationRoutingModule { }