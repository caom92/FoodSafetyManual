import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.ozone.water.report.interface'

@Component({
  selector: 'gmp-packing-ozone-water-report',
  templateUrl: './gmp.packing.ozone.water.report.html'
})

export class GMPPackingOzoneWaterReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any
  groupedItems

  constructor() {
    super()
  }

  ngOnInit() {
    super.ngOnInit()
    for (let item of this.report.items) {
      let idString = ''
      for (let field of item.fields) {
        idString += field.name_en
      }
      item.config = idString
    }

    this.groupedItems = this.groupBy(this.report.items, "config")
  }

  groupBy(collection, property) {
    var i = 0, val, index,
      values = [], result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
        result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  public getOrientation(): string {
    return 'L'
  }

  public getFontSize(): string {
    return '9'
  }


  public getCSS(): string {
    return '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { width: 631px; } .nameColumn { width: 150px; } .valueColumn { width: 481px; } </style>'
  }
}