import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CropRegistryViewComponent } from './view/crop-registry-view.component'

const routes: Routes = [
  {
    path: '',
    component: CropRegistryViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CropRegistryRoutingModule { }