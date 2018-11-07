import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { DocumentListComponent } from './list/document.list'
import { DocumentViewerComponent } from './viewer/document.viewer'

const viewerState: Ng2StateDeclaration = { name: 'document-list', url: '/document-list', component: DocumentListComponent }
const listState: Ng2StateDeclaration = { name: 'document-viewer', url: '/document-viewer/*path', component: DocumentViewerComponent }

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