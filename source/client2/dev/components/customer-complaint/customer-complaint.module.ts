import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalizationModule } from 'angular-l10n'
import { MaterializeModule } from 'ngx-materialize'

import { CustomerComplaintCaptureComponent } from './capture/customer-complaint-capture.component'
import { CustomerComplaintRoutingModule } from './customer-complaint-routing.module'
import { CustomerComplaintList } from './list/customer-complaint-list.component'
import { CustomerComplaintLogComponent } from './log/customer-complaint-log.component'
import { CustomerComplaintReportLoader } from './report/loader/customer-complaint-report-loader.component'
import { CustomerComplaintReport } from './report/report/customer-complaint-report.component'
import { CustomerComplaintReportViewer } from './report/viewer/customer-complaint-report-viewer.component'

@NgModule({
  imports: [
    LocalizationModule,
    ReactiveFormsModule,
    MaterializeModule,
    CustomerComplaintRoutingModule,
    CommonModule
  ],
  declarations: [
    CustomerComplaintCaptureComponent,
    CustomerComplaintList,
    CustomerComplaintLogComponent,
    CustomerComplaintReportLoader,
    CustomerComplaintReport,
    CustomerComplaintReportViewer
  ],
  exports: [
    CustomerComplaintCaptureComponent,
    CustomerComplaintList,
    CustomerComplaintLogComponent,
    CustomerComplaintReportLoader,
    CustomerComplaintReport,
    CustomerComplaintReportViewer
  ]
})

export class CustomerComplaintModule { }
