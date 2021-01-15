import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingBathroomCleaningAuthorizationComponent } from './authorization/gap-packing-bathroom-cleaning-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingBathroomCleaningAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingBathroomCleaningAuthorizationRoutingModule { }