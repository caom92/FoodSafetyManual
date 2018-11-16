import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { DocumentListComponent } from './list/document.list'
import { DocumentRoutingModule } from './document-routing.module'
import { DocumentViewerComponent } from './viewer/document.viewer'

@NgModule({
  imports: [
    LocalizationModule,
    MaterializeModule,
    DocumentRoutingModule,
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
