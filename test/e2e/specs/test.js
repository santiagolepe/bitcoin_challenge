// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

   // And the graph should be automatically updated in real time   

  '1. Live graph': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    // Then I should see the graph 
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000);
      browser.assert.elementCount('canvas', 1);

    // the last prices of the BTC and ETH currencies
    //  And the graph should be automatically updated in real time
    browser.expect.element('#BTC_current')
      .text.to.contain('1 BTC = 0 USD').before(0);

    browser.expect.element('#ETH_current')
      .text.to.contain('1 ETH = 0 USD').before(0);

    browser.expect.element('#BTC_current')
    .text.to.not.contain('1 BTC = 0 USD').after(10000);

    browser.expect.element('#ETH_current')
    .text.to.not.contain('1 ETH = 0 USD').after(10000);

    browser.end()
  }
}
