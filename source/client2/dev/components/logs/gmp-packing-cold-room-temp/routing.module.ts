import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingColdRoomTempAuthorizationComponent } from './authorization/gmp.packing.cold.room.temp.authorization'

const routes: Routes = [
  { path: ':report_id', component: GMPPackingColdRoomTempAuthorizationComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingColdRoomTempAuthorizationRoutingModule { }