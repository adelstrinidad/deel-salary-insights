import { expect, test } from "@playwright/test";

import SalaryInsights from "../pages/salaryInsights";

test.beforeEach("", async ({ page }) => {
  await page.goto("https://growth.deel.training/dev/salary-insights");
  // Expect the page is loaded
  await expect(page.locator(`[data-qa="role-field"]`)).toBeVisible();
});
const testData = [
  ["Accountant", "Brazil", "BRL"],
  ["Software Engineer", "Japan", "JPY"],
  ["QA Engineer", "Canada", "CAD"],
];

test.describe("salary-insights tests", () => {
  for (const input of testData) {
    test(`Verify salary insights for role ${input[0]} and country ${input[1]}`, async ({
      page,
    }) => {
      const role = `${input[0]}`;
      const country = `${input[1]}`;
      const filterValues = ["Senior Level", "Annual Salary"];

      const salaryInsights = new SalaryInsights(page);
      await salaryInsights.selectRoleFill();
      await salaryInsights.fillAndSelectRole(role, page);
      await salaryInsights.fillAndSelectCountry(country, page);
      await salaryInsights.selectSearchButton();
      await expect(salaryInsights.refineYourViewLabel).toBeVisible();

      await salaryInsights.validateFilters(input, filterValues, expect);

      const salaryTableTitle = await salaryInsights.getSalaryTableTitle();
      expect(salaryTableTitle).toEqual(
        `Senior ${role} compensation in ${country}`
      );

      const promoQuestionText = await salaryInsights.getPromoQuestion();
      expect(promoQuestionText).toEqual(
        `How much does a Senior ${role} make in ${country}? `
      );
    });
  }
});
