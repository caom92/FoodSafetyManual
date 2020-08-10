import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GPSignaturesComponent } from './list/gp-signatures-list.component'
import { GPSignaturesLogListComponent } from './log-list/gp-signatures-log-list.component'

const routes: Routes = [
  {
    path: 'supervisor-list',
    component: GPSignaturesComponent
  },
  {
    path: 'log-list',
    component: GPSignaturesLogListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GPSignaturesRoutingModule { }