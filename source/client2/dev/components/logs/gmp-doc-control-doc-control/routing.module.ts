import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPDocControlDocControlAuthorizationComponent } from './authorization/gmp.doc.control.doc.control.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPDocControlDocControlAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPDocControlDocControlAuthorizationRoutingModule { }