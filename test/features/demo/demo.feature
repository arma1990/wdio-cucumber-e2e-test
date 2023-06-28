Feature: Demo feature

    Scenario Outline: Run first demo feature
        Given Go to google page
        When Search with <SearchItem>
        Then Click on the first search result
        Then Url shoul be match <ExpectedURL>

        Examples:
            | TestID     | SearchItem | ExpectedURL           |
            | Demo_TC001 | wdio       | https://webdriver.io/ |