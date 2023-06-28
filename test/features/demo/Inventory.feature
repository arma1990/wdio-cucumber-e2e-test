Feature: Inventory

    Scenario Outline: Inventory demo
        Given Login to inventory web page
        When Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberOfProducts |
            | INTV_TC001 | 6                |