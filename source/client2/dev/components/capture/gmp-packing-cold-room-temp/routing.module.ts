import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPPackingColdRoomTempCaptureComponent } from './capture/gmp-packing-cold-room-temp-capture.component'

const routes: Routes = [
  { path: '', component: GMPPackingColdRoomTempCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPPackingColdRoomTempCaptureRoutingModule { }