module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'freactal-seed-demo',
          headHtmlSnippet: `<style type="text/css">body, html {margin: 0; padding: 0}</style>`
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
