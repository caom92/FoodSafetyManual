export interface RegisterListItem {
  name: TranslatableText,
  code: string,
  pending: number
}

export interface TranslatableText {
  en: string,
  es: string
}
