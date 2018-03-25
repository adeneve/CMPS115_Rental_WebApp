// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL
  
      browser
        .url('https://localhost:8080/#/profile/-L7780RvqtRQQvKG2zIB')
        .waitForElementVisible('#app', 5000)
        .assert.elementPresent('.card-title')
        .assert.elementPresent('.Items')
        .click('.Bio')
        .assert.elementPresent('.Bio')
        .click('.Contact')
        .assert.elementPresent('.Contact')
        .click('.Reviews')
        .assert.elementPresent('.Reviews')
        
        .end()
    }
  }
  