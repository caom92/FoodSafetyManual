import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.ozone.water.report.interface'

@Component({
  selector: 'gmp-packing-ozone-water-report',
  templateUrl: './gmp.packing.ozone.water.report.html'
})

export class GMPPackingOzoneWaterReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any
  groupedItems
  reportCSS: string = ''
  signatures: Array<string> = []

  constructor(ts: TService) {
    super(ts)
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

    this.groupedItems = this.groupBy(this.report.items, 'config')

    for (let group in this.groupedItems) {
      let signature = ''
      let nameCSS = 85
      let timeCSS = 40
      let maxWidth = 940 - nameCSS - timeCSS
      let nameMultiplier = 17
      let timeMultiplier = 8
      let variableCSS: Array<{ id: number, width: number, active: boolean, multiplier: number }> = [
        { id: 1, width: 35, active: false, multiplier: 7 },
        { id: 2, width: 35, active: false, multiplier: 7 },
        { id: 3, width: 35, active: false, multiplier: 7 },
        { id: 4, width: 40, active: false, multiplier: 8 },
        { id: 5, width: 0, active: false, multiplier: 0 },
        { id: 6, width: 0, active: false, multiplier: 0 },
        { id: 7, width: 0, active: false, multiplier: 0 },
        { id: 8, width: 0, active: false, multiplier: 0 },
        { id: 9, width: 0, active: false, multiplier: 0 },
        { id: 10, width: 40, active: false, multiplier: 8 },
        { id: 11, width: 40, active: false, multiplier: 8 },
        { id: 12, width: 60, active: false, multiplier: 12 },
        { id: 13, width: 45, active: false, multiplier: 9 }
      ]

      for (let field of this.groupedItems[group][0].fields) {
        if (signature != '') {
          signature += '-'
        }
        signature += field.field_id
        variableCSS[Number(field.field_id) - 1].active = true
      }

      let bigFields = 0
      for (let css of variableCSS) {
        if (css.active == true) {
          if (css.width == 0) {
            bigFields++
          } else {
            maxWidth -= css.width
          }          
        }
      }

      let bigFieldsWidth = 0
      let shortFieldsWidth = 0
      let multipliers = 0
      if (bigFields != 0) {
        bigFieldsWidth = Math.floor(maxWidth / bigFields)
        maxWidth -= (bigFieldsWidth * bigFields)
      } else {
        multipliers += nameMultiplier
        for (let css of variableCSS) {
          if (css.active == true && css.width != 0) {
            multipliers += css.multiplier
          }
        }
        shortFieldsWidth = Math.floor(maxWidth / multipliers)
        maxWidth -= (shortFieldsWidth * multipliers)
      }

      for (let css of variableCSS) {
        if (css.active == true) {
          if (css.width != 0) {
            this.reportCSS += '.field_' + signature + '_' + css.id + '{width:' + (css.width + css.multiplier * shortFieldsWidth) + 'px}'
          } else {
            this.reportCSS += '.field_' + signature + '_' + css.id + '{width:' + bigFieldsWidth + 'px}'
          }
        }
      }

      this.reportCSS += '.nameColumn_' + signature + '{width:' + (nameCSS + nameMultiplier * shortFieldsWidth + maxWidth) + 'px}'
      this.reportCSS += '.timeColumn_' + signature + '{width:' + (timeCSS) + 'px}'
      this.signatures.push(signature)
    }
  }

  public groupBy(collection, property): Array<any> {
    var i = 0, val, index,
      values = [], result = []
    for (; i < collection.length; i++) {
      val = collection[i][property]
      index = values.indexOf(val)
      if (index > -1)
        result[index].push(collection[i])
      else {
        values.push(val)
        result.push([collection[i]])
      }
    }
    return result
  }

  public segmentCSS(): string {
    return this.reportCSS
  }

  public getOrientation(): string {
    return 'L'
  }

  public getFontSize(): string {
    return '9'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.nameColumn{width:80px}.field_1{width:35px}.field_2{width:35px}.field_3{width:35px}.field_4{width:40px}.field_10{width:40px}.field_11{width:40px}.field_12{width:60px}.field_13{width:45px}.field_5{width:106px}.field_6{width:106px}.field_7{width:106px}.field_8{width:106px}.field_9{width:106px}' + this.reportCSS + '</style>'
  }
}