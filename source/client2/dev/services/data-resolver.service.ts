import { Injectable } from '@angular/core'

@Injectable()
export class DataResolverService {
  constructor() {

  }

  public resolveString(input: string | number, defaultValue?: string): string {
    let defaultResult: string = (String(defaultValue) === defaultValue) ? defaultValue : ''

    if (Number(input) === input) {
      return (input !== null && input !== undefined && Number.isNaN(input) !== true) ? String(input) : defaultResult
    } else {
      return (input !== null && input !== undefined) ? String(input) : defaultResult
    }
  }

  public resolveBoolean(input: string | number, defaultValue?: boolean): boolean {
    let defaultResult: boolean = (Boolean(defaultValue) === defaultValue) ? defaultValue : null

    return (input !== null && input !== undefined) ? (Number(input) === 1) ? true : (Number(input) === 0) ? false : defaultResult : defaultResult
  }

  public resolveNumber(input: string | number, defaultValue?: number): number {
    let defaultResult: number = (Number(defaultValue) === defaultValue) ? defaultValue : null

    return (!Number.isNaN(Number(input)) && input !== null && input !== undefined) ? Number(input) : defaultResult
  }
}