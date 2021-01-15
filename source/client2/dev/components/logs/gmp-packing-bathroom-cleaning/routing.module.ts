import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingBathroomCleaningAuthorizationComponent } from './authorization/gmp-packing-bathroom-cleaning-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingBathroomCleaningAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPPackingBathroomCleaningAuthorizationRoutingModule { }