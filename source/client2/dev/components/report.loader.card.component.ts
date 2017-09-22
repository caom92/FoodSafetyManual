import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ng2-materialize'

@Component({
    selector: 'report-loader-card',
    template: `
        <mz-card [backgroundClass]="'white'" [hoverable]="true">
            <mz-card-content>
                <div class="row" style="margin-bottom: 0px;">
                    <div class="col s9 m9 l9" style="font-size: 24px;">1991-31-12</div>
                    <div class="col s1 m1 l1"><button mz-button float="true" class="blue"><i mz-icon-mdi [icon]="'email'"></i></button></div>
                    <div class="col s1 m1 l1"><button mz-button float="true" class="red"><i mz-icon-mdi [icon]="'file-pdf-box'"></i></button></div>
                    <div class="col s1 m1 l1"><button mz-button float="true" class="green"><i mz-icon-mdi [icon]="'file-document-box'"></i></button></div>
                </div>
            </mz-card-content>
        </mz-card>
    `
})

export class ReportLoaderCard {
    componentName: "ReportLoaderCard"
}