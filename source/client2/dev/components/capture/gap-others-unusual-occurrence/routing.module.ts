import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPOthersUnusualOccurrenceCaptureComponent } from './capture/gap-others-unusual-occurrence-capture.component'

const routes: Routes = [
  { path: '', component: GAPOthersUnusualOccurrenceCaptureComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class GAPOthersUnusualOccurrenceCaptureRoutingModule { }