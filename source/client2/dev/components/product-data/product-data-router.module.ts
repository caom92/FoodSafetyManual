import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductDataViewerComponent } from './viewer/product-data-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: ProductDataViewerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductDataRoutingModule { }