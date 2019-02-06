import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPDocControlDocControlAuthorizationComponent } from './authorization/gap.doc.control.doc.control.authorization'

const routes: Routes = [
  { path: ':report_id', component: GAPDocControlDocControlAuthorizationComponent },
  { path: '**', redirectTo: '/pending-authorizations-list' }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPDocControlDocControlAuthorizationRoutingModule { }