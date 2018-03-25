// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'Test Click on Categories': function (browser) {
      // automatically uses dev Server port from /config.index.js
      // default: http://localhost:8080
      // see nightwatch.conf.js
      const devServer = browser.globals.devServerURL
  
      browser
        .url(devServer) //home page
        .waitForElementVisible('#app', 5000) //check for #app
        .assert.elementPresent('#title') //check for #title
        .assert.elementPresent('.carousel-3d-container') //check carousel
        .assert.elementPresent('.cat', 6) //check categories
        .assert.elementPresent('.catImg') //check categorie images
        .click('.catImg') //click categorie images
        .assert.urlContains('Video') //Check if video game was searched
        .end()
    },

    'Test search function': function(browser) {
      const devServer = browser.globals.devServerURL

      browser
        .url(devServer) //home page
        .assert.elementPresent('.input-group') //check search bar
        .assert.elementPresent('.form-control') //check input type is text
        .setValue('#inputText', 'algolia')
        .click('.input-group-btn') //click on search button
        .assert.urlContains('algolia') //check if search directed to search with algolia
        .end()
    }
  }
  