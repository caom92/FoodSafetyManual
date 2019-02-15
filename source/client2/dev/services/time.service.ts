import { Injectable } from '@angular/core'

@Injectable()
export class DateTimeService {
  constructor() {
  }

  public getISODate(date?: Date): string {
    let ISODate = ''

    if (date === undefined) {
      date = new Date()
    }

    ISODate += date.getFullYear() + '-'

    if (date.getMonth() < 9) {
      ISODate += '0' + (date.getMonth() + 1) + '-'
    } else {
      ISODate += (date.getMonth() + 1) + '-'
    }

    if (date.getDate() < 10) {
      ISODate += '0' + date.getDate()
    } else {
      ISODate += date.getDate()
    }

    return ISODate
  }

  public getISOTime(date?: Date): string {
    let ISOTime = ''
      
    if (date === undefined) {
      date = new Date()
    }

    if (date.getHours() < 10) {
      ISOTime += '0' + date.getHours() + ':'
    } else {
      ISOTime += date.getHours() + ':'
    }

    if (date.getMinutes() < 10) {
      ISOTime += '0' + date.getMinutes()
    } else {
      ISOTime += date.getMinutes()
    }

    return ISOTime
  }
}