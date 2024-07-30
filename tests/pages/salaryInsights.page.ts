import { Expect, Locator, Page } from "@playwright/test";

class SalaryInsights {
  private readonly roleField: Locator;
  private readonly roleInput: Locator;
  private readonly expandMoreInfoIcon: Locator;
  private readonly listbox: Locator;
  private readonly countryCombo: Locator;
  private readonly searchButton: Locator;
  private readonly filterBar: Locator;
  private readonly filterBarLabel: Promise<Array<Locator>>;
  private readonly salaryTableTitle: Locator;
  private readonly promoQuestion: Locator;
  refineYourViewLabel: Locator;

  constructor(page: Page) {
    this.roleField = page.locator(`[data-qa="role-field"]`);
    this.roleInput = page.locator(`[name="role"]`);
    this.expandMoreInfoIcon = this.roleField.filter({
      has: page.locator(`[data-testid="ExpandMoreIcon"]`),
    });
    this.listbox = page.locator(`[role="listbox"]`);
    this.countryCombo = page.getByRole("combobox", { name: "country" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.refineYourViewLabel = page.getByText("Refine your view");
    this.filterBar = page.locator('[data-qa="filter-bar"]');
    this.filterBarLabel = this.filterBar.locator("h6").all();
    this.salaryTableTitle = page.locator(`[data-qa="salary-table"] h2`);
    this.promoQuestion = page.locator(`#promo-section-container h3`);
  }

  async selectRoleFill() {
    await this.roleField.click();
  }
  async fillAndSelectRole(role: string, page: Page) {
    await this.roleInput.click();
    await this.roleInput.fill(role);
    await page.waitForTimeout(3000); // I tried many different things expecting to see the list and nothing worked
    await this.expandMoreInfoIcon.click();
    await page.waitForSelector("ul", { state: "visible" });
    await this.listbox.filter({ hasText: role }).click();
  }

  async fillAndSelectCountry(country: string, page: Page) {
    this.countryCombo.click();
    this.countryCombo.fill(country);
    await page.waitForSelector("ul", { state: "visible" });
    await this.listbox.filter({ hasText: country }).click();
  }
  async selectSearchButton() {
    await this.searchButton.click();
  }

  async validateFilters(
    input: string[],
    filterValues: string[],
    expect: Expect
  ) {
    filterValues.unshift(input[0], input[1]);
    (await this.filterBarLabel).forEach(async (el) => {
      expect(filterValues).toContain(await el.textContent());
    });
    const filterCurrency = await this.filterBar
      .locator("p")
      .nth(3)
      .textContent();
    expect(filterCurrency).toEqual(input[2]);
  }

  async getSalaryTableTitle() {
    return await this.salaryTableTitle.textContent();
  }
  async getPromoQuestion() {
    return await this.promoQuestion.textContent();
  }
}

export default SalaryInsights;
