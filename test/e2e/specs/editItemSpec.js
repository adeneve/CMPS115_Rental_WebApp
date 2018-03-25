// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Edit Item UI tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '#/editItem/-L7VgfkKGnzcKcOrSsTV')
      .waitForElementVisible('.edit-view', 5000)
      .assert.elementPresent('#add')
      .assert.elementPresent('input', 4) // title, description, price, zip
      .assert.elementPresent('select', 2) // category and condition
      .assert.elementPresent('h3') // title
      .assert.elementPresent('h4') // reservation title
      .assert.elementPresent('.Image')


      .end()
  }
}
