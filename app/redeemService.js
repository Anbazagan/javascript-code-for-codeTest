// app/redeemService.js
const { CHANNEL_REWARDS, ELIGIBILITY_RESULTS } = require("./constants");

function rewardsService({ customerAccountNumber, portfolio, eligibilityService }) {
  try {
    const eligibility = eligibilityService(customerAccountNumber);

    if (eligibility === ELIGIBILITY_RESULTS.ELIGIBLE) {
      const rewards = portfolio
        .map((channel) => CHANNEL_REWARDS[channel])
        .filter((reward) => reward !== null);
      return { data: rewards };
    }

    if (eligibility === ELIGIBILITY_RESULTS.INELIGIBLE) {
      return { data: [] };
    }

    if (eligibility === ELIGIBILITY_RESULTS.TECHNICAL_FAILURE) {
      return { data: [] }; // Log error in a real app
    }

    if (eligibility === ELIGIBILITY_RESULTS.INVALID_ACCOUNT) {
      return { error: "Invalid account number." };
    }

    return { data: [] }; // Fallback for unexpected cases
  } catch (error) {
    return { data: [] }; // Handle any runtime errors
  }
}

module.exports = rewardsService;

