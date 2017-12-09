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
  },

  // Given I'm a visitor
  // When I enter into the site
  // And I select BTC as cryptocurrency in the calculator
  // And I enter 200 in the input
  // Then I should see the equivalent in USD
  // And If I change the currency to EUR
  // Then The calculator should update the equivalent in EUR

  '2. BTC to USD/EUR': function (browser) {
    browser.setValue('#bitcoin_sel', 'BTC').pause(5000);
    browser.setValue('#bitcoin_input', 1);
    browser.setValue('#currency_sel', 'USD').pause(5000);
    browser.expect.element('#currency_input').value.to.not.equal(0)
    
    browser.getValue('#currency_input', function(result){
      browser.setValue('#currency_sel', 'EUR').pause(5000)
      browser.expect.element('#currency_input').value.to.not.equal(result.value)
    });
  },

  // Scenario: ETH to USD/EUR
  // Given I'm a visitor
  // When I enter into the site
  // And I select ETH as cryptocurrency in the calculator
  // And I enter 200 in the input
  // Then I should see the equivalent in USD
  // And If I change the currency to EUR
  // Then The calculator should update the equivalent in EUR

  '3. ETH to USD/EUR': function (browser) {
    browser.clearValue('#bitcoin_sel');
    browser.setValue('#bitcoin_sel', 0);
    // browser.execute(function(){
      browser.setValue('#bitcoin_sel', 'ETH').pause(5000);
      browser.setValue('#bitcoin_input', 1);
      browser.setValue('#currency_sel', 'USD').pause(5000);
      browser.expect.element('#currency_input').value.to.not.equal(0)
      
      browser.getValue('#currency_input', function(result){
        browser.setValue('#currency_sel', 'EUR').pause(5000)
        browser.expect.element('#currency_input').value.to.not.equal(result.value)
      });
    // });
  },

  // Scenario: Auto-update accordingly with the last price
  // Given I'm a visitor
  // When I enter into the site
  // And I select BTC as cryptocurrency in the calculator
  // And I enter 200 in the input
  // Then I should see the equivalent in USD
  // Then The price of BTC is updated
  // Then The calculator should update the equivalent in USD

  '4. Auto-update accordingly with the last price': function (browser) {
    browser.clearValue('#bitcoin_sel');
    browser.setValue('#bitcoin_sel', 0);
    // browser.execute(function(){
      browser.setValue('#bitcoin_sel', 'BTC').pause(5000);
      browser.setValue('#bitcoin_input', 1);
      browser.setValue('#currency_sel', 'USD').pause(5000);
      browser.expect.element('#currency_input').value.to.not.equal(0);
      browser.getValue('#currency_input', function(result){
        // wait for 50 sec. to change bitcoins vaules
        browser.pause(50000);
        browser.setValue('#currency_sel', 'BTC').pause(1000);
        browser.setValue('#currency_sel', 'USD').pause(1000);
        browser.expect.element('#currency_input').value.to.not.equal(result.value)
      });
    // });
  },

  // Feature: As a visitor I should be able to see a table in real time with the price of BTC and ETH
  
  // Scenario: Table with live prices of BTC
  //   Given I'm a visitor
  //   When I enter into the site
  //   Then I should see a table with the following information
  //     | Time   | USD   | EUR   |
  //     | <time> | <USD> | <EUR> |
  //   And The table must be updated every 10 seconds

  '5. Scenario: Table with live prices of BTC': function (browser) {
     browser.assert.elementCount('table', 2)
     browser.assert.containsText('table thead tr', 'Time USD EUR')
     browser.getText('table tbody tr td', function(res){
      // wait for 10 sec. to change bitcoins vaules
      browser.pause(10000)
      browser.expect.element('table tbody tr td').text.to.not.equal(res.value)
     })
  },

  //   Scenario: Table with live prices of ETH
  //   Given I'm a visitor
  //   When I enter into the site
  //   Then I should see a table with the following information
  //     | Time   | USD   | EUR   | BTC              |
  //     | <time> | <USD> | <EUR> | <BTC equivalent> |
  //   And The table must be updated every 10 seconds

  '6. Scenario: Table with live prices of ETH': function (browser) {
     browser.assert.containsText('table thead tr', 'Time USD EUR')
     browser.getText('#table_ETH tbody tr td', function(res){
      // wait for 10 sec. to change bitcoins vaules
      browser.pause(10000)
      browser.expect.element('#table_ETH tbody tr td').text.to.not.equal(res.value)
     })
  },

}
