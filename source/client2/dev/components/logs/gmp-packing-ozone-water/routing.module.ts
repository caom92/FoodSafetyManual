import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingOzoneWaterAuthorizationComponent } from './authorization/gmp.packing.ozone.water.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingOzoneWaterAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingOzoneWaterAuthorizationRoutingModule { }