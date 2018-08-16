export interface TextAutocomplete {
  data: { [key: string]: string }
  limit: number
  current: string
  count: number
  arr?: Array<string>
}