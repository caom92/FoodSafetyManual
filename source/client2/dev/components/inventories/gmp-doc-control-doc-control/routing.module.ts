import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GMPDocControlDocControlInventoryViewerComponent } from './viewer/gmp.doc.control.doc.control.inventory.viewer.component'

const routes: Routes = [
  { path: '', component: GMPDocControlDocControlInventoryViewerComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GMPDocControlDocControlInventoryRoutingModule { }