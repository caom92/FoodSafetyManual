import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GAPDocControlDocControlInventoryViewerComponent } from './viewer/gap.doc.control.doc.control.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GAPDocControlDocControlInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GAPDocControlDocControlInventoryRoutingModule { }