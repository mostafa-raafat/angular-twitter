Feature: Filter result using sorting by

    Scenario: Sort by title
        Given I am on the product page
        When I click on sort by 'title'
        Then I should see 'id' = 1005 as a first row