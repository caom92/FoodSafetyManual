import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterListComponent } from './register-list/register-list.component'

const routes: Routes = [
  {
    path: '',
    component: RegisterListComponent
  },
  {
    path: 'finished-product',
    loadChildren: './finished-product/finished-product.module#FinishedProductModule'
  },
  {
    path: 'vehicle-cleaning',
    loadChildren: './vehicle-cleaning/vehicle-cleaning.module#VehicleCleaningModule'
  },
  {
    path: 'ozone-water',
    loadChildren: './ozone-water/ozone-water.module#OzoneWaterModule'
  },
  {
    path: 'footers',
    loadChildren: './footer/register-footer.module#RegisterFooterModule'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegistersRoutingModule { }