const ghpages = require('gh-pages')

ghpages.publish('dist', {
  branch: 'master',
  message: ':rocket: inforced.io'
}, err => console.log('error'))
