
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