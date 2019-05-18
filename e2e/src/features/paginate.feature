Feature: Apply Material DataTable Paginator

    Scenario: paginate by clicking on next page
        Given I am on the product page
        When I click on next page button
        Then I should see 11 as a first row

    Scenario: paginate by clicking on last page
        Given I am on the product page
        When I click on last page button
        Then I should see 4991 as a first row