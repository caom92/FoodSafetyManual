import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gmp.others.unusual.occurrence.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPOthersUnusualOccurrenceAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPOthersUnusualOccurrenceAuthorizationRoutingModule { }