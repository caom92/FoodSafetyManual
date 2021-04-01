import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthorizationListComponent } from './app.authorizations'
import { EditProfileComponent } from './app.edit.profile'
import { InventoryListComponent } from './app.inventory.list'
import { LogFootersComponent } from './app.log.footers'
import { LogListComponent } from './app.log.list'
import { LogInComponent } from './app.login'
import { ReportProblemComponent } from './app.report.problem'
import { SignaturesComponent } from './app.signatures'
import { SupervisorsComponent } from './app.supervisors'
import { UsersComponent } from './app.users'
import { ZonesComponent } from './app.zones'
import { CAPACaptureComponent } from './capa/capture/capa-capture.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'report-problem',
    component: ReportProblemComponent
  },
  {
    path: 'log-selection/:program/:module',
    component: LogListComponent
  },
  {
    path: 'inventory-selection/:program/:module',
    component: InventoryListComponent
  },
  {
    path: 'pending-authorizations-list',
    component: AuthorizationListComponent
  },
  {
    path: 'log-footers',
    component: LogFootersComponent
  },
  {
    path: 'supervisors',
    component: SupervisorsComponent
  },
  {
    path: 'signatures',
    component: SignaturesComponent
  },
  {
    path: 'zones',
    component: ZonesComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  /*{
    path: 'capa/log',
    component: CAPAFormComponent
  },*/
  {
    path: 'capa/capture',
    component: CAPACaptureComponent
  },
  {
    path: 'log',
    loadChildren: './capture/capture.module#CaptureModule'
  },
  {
    path: 'authorizations',
    loadChildren: './logs/authorization.module#AuthorizationModule'
  },
  {
    path: 'inventory',
    loadChildren: './inventories/inventory.module#InventoryModule'
  },
  {
    path: 'product-data-viewer',
    loadChildren: './product-data/product-data.module#ProductDataModule'
  },
  {
    path: 'crop-registry',
    loadChildren: './crop-registry/crop-registry.module#CropRegistryModule'
  },
  {
    path: 'menu',
    loadChildren: './menu/menu.module#MenuModule'
  },
  {
    path: 'document',
    loadChildren: './document-viewer/document.module#DocumentModule'
  },
  {
    path: 'customer-complaint',
    loadChildren: './customer-complaint/customer-complaint.module#CustomerComplaintModule'
  },
  {
    path: 'gp-signatures',
    loadChildren: './gp-signatures/gp-signatures.module#GPSignaturesModule'
  },
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/menu'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
  
export class RootRoutingModule {}
