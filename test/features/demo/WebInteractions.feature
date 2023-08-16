Feature: Web Interactions

    @smoke
    Scenario Outline: Demo Web Interactions
        Given A webpage is opened
        When Perform web interactions

        Examples:
            | TestID    |
            | WEB_TC002 |