// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'sign in UI tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#signIn')
      .assert.elementPresent('#signInModal')
      .click('#signIn')
      .pause(600)
      .assert.visible('#signInModal')

      .assert.elementPresent('#email')
      .assert.elementPresent('#pass')
      .assert.attributeContains('#pass', 'type', 'password')

      .assert.elementPresent('#PR') //password reset

      .click('#PRButton')
      .pause(600)
      .assert.visible('#PR')

      .end()
  }
}
