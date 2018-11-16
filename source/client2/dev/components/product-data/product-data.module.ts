import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'
import { PapaParseModule } from 'ngx-papaparse'

import { ProductDataViewerComponent } from './viewer/product-data-viewer.component'
import { ProductDataRoutingModule } from './product-data-router.module'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    PapaParseModule,
    ProductDataRoutingModule,
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
