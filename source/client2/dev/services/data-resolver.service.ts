import { Injectable } from '@angular/core'

@Injectable()
export class DataResolverService {
  constructor() {

  }

  public resolveString(input: string | number, defaultValue?: string): string {
    let defaultResult: string = (String(defaultValue) === defaultValue) ? defaultValue : ''

    return ((Number(input) === input && Number.isNaN(input) !== true) || (String(input) === input)) ? String(input) : defaultResult
  }

  public resolveBoolean(input: string | number | boolean, defaultValue?: boolean): boolean {
    let defaultResult: boolean = (Boolean(defaultValue) === defaultValue) ? defaultValue : null

    return (input === true || input === 1 || input === '1') ? true : (input === false || input === 0 || input === '0') ? false : defaultResult
  }

  public resolveNumber(input: string | number, defaultValue?: number): number {
    let defaultResult: number = (Number(defaultValue) === defaultValue) ? defaultValue : null

    return (!Number.isNaN(Number(input)) && (Number(input) === input || (String(input) === input && input.trim().length > 0))) ? Number(input) : defaultResult
  }
}