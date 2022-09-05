import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProcessFinishedProductViewComponent } from './view/process-finished-product-view.component'

const routes: Routes = [
  {
    path: '',
    component: ProcessFinishedProductViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProcessFinishedProductRoutingModule { }
