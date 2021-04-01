import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { CropRegistryRoutingModule } from './crop-registry-routing.module'
import { CropRegistryAddComponent } from './add/crop-registry-add.component'
import { CropRegistryViewComponent } from './view/crop-registry-view.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    CropRegistryRoutingModule,
    CommonModule
  ],
  declarations: [
    CropRegistryAddComponent,
    CropRegistryViewComponent
  ],
  exports: [
    CropRegistryAddComponent,
    CropRegistryViewComponent
  ]
})

export class CropRegistryModule { }
