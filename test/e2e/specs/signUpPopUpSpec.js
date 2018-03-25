// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'sign up UI tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#signUp')
      .assert.elementPresent('#signUpModal')
      .click('#signUp')
      .pause(600)
      .assert.visible('#signUpModal')

      .assert.elementPresent('#username')
      .assert.elementPresent('#emailSignUp')
      .assert.attributeContains('#pass1', 'type', 'password')
      .assert.attributeContains('#pass2', 'type', 'password')

      .setValue('#username', '')
      .click('#signUpConfirm')
      .pause(600)
      .assert.visible('#signUpError')

      .end()
  }
}
