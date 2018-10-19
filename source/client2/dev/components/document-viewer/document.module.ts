import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { DocumentViewerComponent } from './viewer/document.viewer'
import { DocumentListComponent } from './list/document.list'

const viewerState = { name: 'document-list', url: '/document-list', component: DocumentListComponent }
const listState = { name: 'document-viewer', url: '/document-viewer/*path', component: DocumentViewerComponent }

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    UIRouterModule.forChild({ states: [ viewerState, listState ] }),
    CommonModule
  ],
  declarations: [
    DocumentViewerComponent,
    DocumentListComponent
  ],
  exports: [
    DocumentViewerComponent,
    DocumentListComponent
  ]
})

export class DocumentModule { }