export default {
    titleTemplate: '%s | サイト名',
    defaultTitle: 'サイト名',
    description: 'サイトのデフォルト説明文',
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      site_name: 'サイト名',
    },
    twitter: {
      handle: '@yourhandle',
      site: '@site',
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
  };