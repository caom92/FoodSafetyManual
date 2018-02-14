import { Injectable } from '@angular/core'

@Injectable()
export class DateTimeService {
  constructor() {
  }

  getISODate(date) {
    var ISODate = ""

    ISODate += date.getFullYear() + "-"

    if (date.getMonth() < 9) {
      ISODate += "0" + (date.getMonth() + 1) + "-"
    } else {
      ISODate += (date.getMonth() + 1) + "-"
    }

    if (date.getDate() < 10) {
      ISODate += "0" + date.getDate()
    } else {
      ISODate += date.getDate()
    }

    return ISODate
  }

  getISOTime(date) {
    let ISOTime = ""

    if (date.getHours() < 10) {
      ISOTime += "0" + date.getHours() + ":"
    } else {
      ISOTime += date.getHours() + ":"
    }

    if (date.getMinutes() < 10) {
      ISOTime += "0" + date.getMinutes()// + ":"
    } else {
      ISOTime += date.getMinutes()// + ":"
    }

    return ISOTime
  }
}