import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPSelfInspectionPestControlInventoryViewerComponent } from './viewer/gmp.self.inspection.pest.control.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPSelfInspectionPestControlInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPSelfInspectionPestControlInventoryRoutingModule { }