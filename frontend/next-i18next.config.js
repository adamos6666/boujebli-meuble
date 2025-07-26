module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'ar'],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}; 