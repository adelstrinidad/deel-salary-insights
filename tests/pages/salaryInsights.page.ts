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
  private readonly closeArrow: Locator;
  private readonly openArrow: Locator;
  refineYourViewLabel: Locator;

  constructor(page: Page) {
    this.roleField = page.locator(`[data-qa="role-field"]`);
    this.roleInput = page.locator(`[name="role"]`);
    // this.expandMoreInfoIcon = this.roleField.filter({
    //   has: page.locator(`[data-testid="ExpandMoreIcon"]`),
    // });
    this.expandMoreInfoIcon = this.roleField.locator(
      `[data-testid="ExpandMoreIcon"]`
    );
    this.closeArrow = this.roleField.locator(`[title="Close"]`);
    this.openArrow = this.roleField.locator(`[title="Open"]`);
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
    await this.openArrow.click();
    // wait until the dropdwon is opened
    while (!(await this.closeArrow.isVisible())) {
      await this.expandMoreInfoIcon.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
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
    role: string,
    country: string,
    currency: string,
    filterValues: string[],
    expect: Expect
  ) {
    filterValues.unshift(role, country);
    (await this.filterBarLabel).forEach(async (el) => {
      expect(filterValues).toContain(await el.textContent());
    });
    const filterCurrency = await this.filterBar
      .locator("p")
      .nth(3)
      .textContent();
    expect(filterCurrency).toEqual(currency);
  }

  async getSalaryTableTitle() {
    return await this.salaryTableTitle.textContent();
  }
  async getPromoQuestion() {
    return await this.promoQuestion.textContent();
  }
}

export default SalaryInsights;
