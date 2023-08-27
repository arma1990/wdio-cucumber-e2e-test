Feature: E2E Customer Search

    @e2e
    Scenario Outline: <TestID>: Search external customers
        Given Get list of users from reqres.in
        When An as admin user login to nopcommerce site
        Then Verify if all users exist in customers list

        Examples:
            | TestID    |
            | E2E_TC001 |
