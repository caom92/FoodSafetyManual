import { 
  L10nConfig, StorageStrategy, ProviderType 
} from 'angular-l10n'

export const languageConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'es', dir: 'ltr' },
      { code: 'en', dir: 'ltr' }
    ],
    language: 'es',
    storage: StorageStrategy.Cookie,
    defaultLocale: {
      languageCode: 'es',
      countryCode: 'ES'
    },
    currency: 'USD'
  },
  translation: {
    composedKeySeparator: '.',
    providers: [
      { type: ProviderType.Static, prefix: './assets/locale-' }
    ],
    caching: true,
    missingValue: 'Missing translation error'
  }
}