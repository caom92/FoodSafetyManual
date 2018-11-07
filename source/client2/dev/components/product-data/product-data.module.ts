import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2StateDeclaration, UIRouterModule } from '@uirouter/angular'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'
import { PapaParseModule } from 'ngx-papaparse'

import { ProductDataViewerComponent } from './viewer/product-data-viewer.component'

const viewerState: Ng2StateDeclaration = { name: 'product-data-viewer', url: '/product-data-viewer', component: ProductDataViewerComponent }

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    PapaParseModule,
    UIRouterModule.forChild({ states: [viewerState] }),
    CommonModule
  ],
  declarations: [
    ProductDataViewerComponent
  ],
  exports: [
    ProductDataViewerComponent
  ]
})

export class ProductDataModule { }
