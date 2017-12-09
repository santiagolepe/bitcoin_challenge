# bitcoin challenge by Octavio Cesar Santiago Lepe

> A vue porject about bitcoin convertion (challenge at tangosource)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm/yarn run dev

# build for production with minification
npm run build

# run e2e tests
npm/yarn run e2e

TESTING

Feature: As a visitor I should be able to see a graph with the last prices of
the BTC and ETH currencies

Scenario: Live graph
  Given I'm a visitor
  When I enter into the site
  Then I should see the graph with the last prices of the BTC and ETH currencies
  And the graph should be automatically updated in real time

Feature: As a visitor I should be able to use the currency calculator

Scenario: BTC to USD/EUR
  Given I'm a visitor
  When I enter into the site
  And I select BTC as cryptocurrency in the calculator
  And I enter 200 in the input
  Then I should see the equivalent in USD
  And If I change the currency to EUR
  Then The calculator should update the equivalent in EUR

Scenario: ETH to USD/EUR
  Given I'm a visitor
  When I enter into the site
  And I select ETH as cryptocurrency in the calculator
  And I enter 200 in the input
  Then I should see the equivalent in USD
  And If I change the currency to EUR
  Then The calculator should update the equivalent in EUR

Scenario: Auto-update accordingly with the last price
  Given I'm a visitor
  When I enter into the site
  And I select BTC as cryptocurrency in the calculator
  And I enter 200 in the input
  Then I should see the equivalent in USD
  Then The price of BTC is updated
  Then The calculator should update the equivalent in USD

Feature: As a visitor I should be able to see a table in real time with the price of BTC and ETH

Scenario: Table with live prices of BTC
  Given I'm a visitor
  When I enter into the site
  Then I should see a table with the following information
    | Time   | USD   | EUR   |
    | <time> | <USD> | <EUR> |
  And The table must be updated every 10 seconds

Scenario: Table with live prices of ETH
  Given I'm a visitor
  When I enter into the site
  Then I should see a table with the following information
    | Time   | USD   | EUR   | BTC              |
    | <time> | <USD> | <EUR> | <BTC equivalent> |
  And The table must be updated every 10 seconds