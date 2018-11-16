import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPOthersUnusualOccurrenceCaptureComponent } from './capture/gmp-others-unusual-occurrence-capture.component'

const routes: Routes = [
  { path: '', component: GMPOthersUnusualOccurrenceCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GMPOthersUnusualOccurrenceCaptureRoutingModule { }