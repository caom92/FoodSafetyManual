import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingCoolerCleaningAuthorizationComponent } from './authorization/gap-packing-cooler-cleaning-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingCoolerCleaningAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingCoolerCleaningAuthorizationRoutingModule {}
