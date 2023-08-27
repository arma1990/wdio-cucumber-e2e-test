Feature: Inventory

    @demo
    Scenario Outline: <TestID>: Inventory demo
        Given As a standard user I login to inventory web page
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        When Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberOfProducts |
            | INTV_TC001 | 6                |