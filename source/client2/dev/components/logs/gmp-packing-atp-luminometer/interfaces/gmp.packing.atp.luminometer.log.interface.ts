import { SuperWaiting } from '../../super-logs/super.logs.waiting.interface'
import { FormArray } from '@angular/forms';

export interface Log extends SuperWaiting {
  items: Array<LogItem>
}

export interface LogItem {
  id: number
  name: string
  weeks: Array<LogWeek>
}

export interface LogWeek {
  id?: number
  week_num: number
  date?: string
  types: Array<LogType>
}

export interface LogType {
  id: number
  name_en: string
  name_es: string
  tests: Array<LogTest>
}

export interface LogTest {
  id?: number
  test_num: number
  reading?: number
  notes?: string
}

export interface WeekData {
  weeks: Array<LogWeek>
  weeksForm: FormArray
}