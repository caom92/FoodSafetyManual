import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { OzoneWaterRegisterComponent } from './register/ozone-water-register.component'

const routes: Routes = [
  {
    path: '',
    component: OzoneWaterRegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OzoneWaterRoutingModule { }