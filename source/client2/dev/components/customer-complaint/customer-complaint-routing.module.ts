import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CustomerComplaintCaptureComponent } from './capture/customer-complaint-capture.component'

const routes: Routes = [
  {
    path: 'capture',
    component: CustomerComplaintCaptureComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerComplaintRoutingModule { }