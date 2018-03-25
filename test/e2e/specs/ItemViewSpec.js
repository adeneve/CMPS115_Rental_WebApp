module.exports = {
    'Elements Present': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '#/view/-L7VgfkKGnzcKcOrSsTV')
            .waitForElementVisible('.item-view', 5000)
            .assert.elementPresent('.item-image-viewer')
            .assert.elementPresent('.item-info')
            .assert.elementPresent('.item-header')
            .assert.elementPresent('.item-description')
            .assert.elementPresent('.item-star-rating')
            .assert.elementPresent('.item-rental-calendar')
            .assert.elementPresent('.item-reviews')
            .assert.elementPresent('.post-review-form')

    },
    'Interactions Function': function (browser) {
      const devServer = browser.globals.devServerURL

      browser
          .url(devServer + '#/view/-L7VgfkKGnzcKcOrSsTV')
          .waitForElementVisible('.item-view', 5000)
          .assert.hidden('.dropdown-menu')
    },
    'Image Viewer Functions': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '#/view/-L7VgfkKGnzcKcOrSsTV')
            .waitForElementVisible('.item-view', 5000)
            .assert.elementPresent('.item-image-primary')
            .assert.elementPresent('.item-image-tray-container')
    },
    'Star Rating Functions': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '#/view/-L7VgfkKGnzcKcOrSsTV')
            .waitForElementVisible('.item-view', 5000)
            .assert.elementPresent('svg')
    },
    'Rental Calendar Functions': function (browser) {
        const devServer = browser.globals.devServerURL

        browser
            .url(devServer + '#/view/-L7VgfkKGnzcKcOrSsTV')
            .waitForElementVisible('.item-view', 5000)
            .assert.elementPresent('.popover-container')
            .moveToElement('.popover-container', 10, 10)
            .assert.elementPresent('.popover-origin')
    }
}
