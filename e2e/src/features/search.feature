Feature: Filter tweets using search input

    Scenario: type word in the search input
        Given I am on the hashtag tab
        When I type '#mostafa' in the search input
        Then I should see #mostafa in hashtag column

    Scenario: clear search input
        Given I am on the user tab
        When I type 'mostafa' in the search input
        Then I should see mostafa in hashtag column