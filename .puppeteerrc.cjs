const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  chrome: {
    skipDownload: true
  },
  'chrome-headless-shell': {
    skipDownload: false
  },
  cacheDirectory: join(__dirname, '.cache', 'puppeteer')
};
