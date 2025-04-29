// app/redeemService-test.js
const rewardsService = require("./redeemService");
const { ELIGIBILITY_RESULTS } = require("./constants");

function mockEligibilityService(response) {
  return () => response;
}

describe("RewardsService", () => {
  it("should return rewards for eligible customers", () => {
    const result = rewardsService({
      customerAccountNumber: "CUSTOMER_INELIGIBLE",
      portfolio: ["SPORTS", "MUSIC"],
      eligibilityService: mockEligibilityService(ELIGIBILITY_RESULTS.ELIGIBLE),
    });

    expect(result).toEqual({
      data: ["CHAMPIONS_LEAGUE_FINAL_TICKET", "KARAOKE_PRO_MICROPHONE"],
    });
  });

  it("should return no rewards for ineligible customers", () => {
    const result = rewardsService({
      customerAccountNumber: "67890",
      portfolio: ["SPORTS", "MUSIC"],
      eligibilityService: mockEligibilityService(ELIGIBILITY_RESULTS.INELIGIBLE),
    });

    expect(result).toEqual({ data: [] });
  });

  it("should handle technical failure exception gracefully", () => {
    const result = rewardsService({
      customerAccountNumber: "11223",
      portfolio: ["SPORTS", "MUSIC"],
      eligibilityService: mockEligibilityService(ELIGIBILITY_RESULTS.TECHNICAL_FAILURE),
    });

    expect(result).toEqual({ data: [] });
  });

  it("should notify client on invalid account number", () => {
    const result = rewardsService({
      customerAccountNumber: "invalid",
      portfolio: ["SPORTS", "MUSIC"],
      eligibilityService: mockEligibilityService(ELIGIBILITY_RESULTS.INVALID_ACCOUNT),
    });

    expect(result).toEqual({ error: "Invalid account number." });
  });
});
