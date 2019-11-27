import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPSelfInspectionPestControlInventoryViewerComponent } from './viewer/gap.self.inspection.pest.control.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GAPSelfInspectionPestControlInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPSelfInspectionPestControlInventoryRoutingModule { }