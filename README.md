# javascript-code-for-codeTest

# RewardsService

## Assumptions
- Rewards are only provided for eligible customers based on their channel subscriptions.
- If the `eligibilityService` throws an error, no rewards will be returned.
- A mock of the `eligibilityService` is used for testing.

## Design Decisions
- Used constants to map channel-to-reward relationships for easy maintenance.
- Included test cases for all possible responses from the `eligibilityService`.

## How to Run
1. Install dependencies: `npm install`
2. Run tests: `npm run test`

## Node Version
Tested on Node.js 16.13.0
