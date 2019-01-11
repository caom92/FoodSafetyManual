import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gap.others.unusual.occurrence.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPOthersUnusualOccurrenceAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPOthersUnusualOccurrenceAuthorizationRoutingModule { }