const bs = require('browser-sync').create();

bs.init({
  server:'./'
})

bs.watch("./dist/bundle.js",(event,file) => {
  event === 'change' && bs.reload('*.html')
})
