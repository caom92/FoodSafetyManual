import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { RegisterFooterCustomizerComponent } from './customizer/register-footer-customizer.component'

const routes: Routes = [
  {
    path: '',
    component: RegisterFooterCustomizerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegisterFooterRoutingModule { }