// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'Test Edit Profile': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL
  
      browser
        .url(devServer + '/#/editProfile/-L7780RvqtRQQvKG2zIB') //home page
        .waitForElementVisible('#app', 5000) //check for #app
        .assert.elementPresent('#Input1')
        .assert.elementPresent('#Input2')
        .assert.elementPresent('#Input3')
        .assert.elementPresent('#Input1', 'adeneve83@gmail.com')
        .assert.elementPresent('#Input2', 'andrew 83')
        .setValue('#Input3', 'Brandon tested this edit profile successfully')
        .click('.w3-button')
        .end()
    },

  }
  