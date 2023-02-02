import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPPackingMasterSanitationAuthorizationComponent } from './authorization/gap-packing-master-sanitation-authorization.component'

const routes: Routes = [
  { path: ':report_id', component: GAPPackingMasterSanitationAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPPackingMasterSanitationAuthorizationRoutingModule {}
