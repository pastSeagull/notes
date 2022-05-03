const fs = require('fs')
function getSidebar (dir) {
  const files = fs.readdirSync(`${__dirname}/../${dir}`)
  const sidebar = files.map(file => {
    let fileName = file.split('.')[0]
    if (fileName.toUpperCase() === 'README') {
      return ''
    }
    else {
      return fileName
    }
  })
  return sidebar
}

module.exports = {
  logo: '/assets/img/logo.jpg',
  title: 'pastSeagull',
  description: 'Fooly Cooly',
  markdown: {
    extractHeaders: ['h2', 'h3', 'h4', 'h5']
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/nprogress'
  ],
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: '笔记',
        link: '/frontend/'
      },
      {
        text: '博客',
        link: '/note/'
      },
      {
        text: '杂文',
        link: '/gossip/'
      }
    ],
    sidebar: {
      '/frontend/': getSidebar('frontend'),
      '/note/': getSidebar('note'),
    },
    lastUpdated: '上次更新时间',
  }
}
