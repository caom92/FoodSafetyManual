import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DocumentListComponent } from './list/document.list'
import { DocumentViewerComponent } from './viewer/document.viewer'

const routes: Routes = [
  {
    path: 'list',
    component: DocumentListComponent
  },
  {
    path: 'viewer/:path',
    component: DocumentViewerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DocumentRoutingModule { }