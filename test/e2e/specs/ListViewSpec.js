module.exports = {
    'Elements Present': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '#/search/all/test')
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.search-bar')
            .assert.elementPresent('.b-pagination')
            .assert.elementPresent('.list-view-item-content')
            .assert.elementPresent('.dropdown-toggle')
            .assert.elementPresent('.custom-select')
    },
    'Interactions Function': function (browser) {
        const devServer = browser.globals.devServerURL;

        browser
            .url(devServer + '#/search/all/test')
            .waitForElementVisible('#app', 5000)
            .assert.hidden('.dropdown-menu')
            .click('.custom-select')
            .assert.visible('option')
            .click('option[value="Video Games"]')
            .assert.hidden('.dropdown-menu')
            .click('.list-view-item-content')
            .assert.urlContains('view')
            .end()
  }
}
