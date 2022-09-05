import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FinishedProductRegisterComponent } from './register/finished-product-register.component'

const routes: Routes = [
  {
    path: '',
    component: FinishedProductRegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FinishedProductRoutingModule { }