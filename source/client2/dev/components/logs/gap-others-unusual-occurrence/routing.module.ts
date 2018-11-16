import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPOthersUnusualOccurrenceAuthorizationComponent } from './authorization/gap.others.unusual.occurrence.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPOthersUnusualOccurrenceAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPOthersUnusualOccurrenceAuthorizationRoutingModule { }