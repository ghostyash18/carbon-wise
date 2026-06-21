import { test, expect } from '@playwright/test';

test.describe('CarbonWise E2E User Journey', () => {
  test('Complete flow: Landing -> Calculate -> Results -> Dashboard', async ({ page }) => {
    // 1. Landing Page
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Navigate to Calculator
    await page.click('text=Calculate Your Footprint');
    await expect(page).toHaveURL(/.*calculate/);

    // 2. Calculator - Step 1: Transportation
    await expect(page.locator('text=How do you get around?')).toBeVisible();
    await page.click('label[for="transport-public"]');
    // Proceed to Next
    await page.click('button:has-text("Continue to Diet")');

    // 3. Calculator - Step 2: Diet
    await expect(page.locator('text=What does your diet look like?')).toBeVisible();
    await page.click('label[for="dairy-medium"]');
    await page.click('button:has-text("Continue to Home Energy")');

    // 4. Calculator - Step 3: Energy
    await expect(page.locator('text=How energy efficient is your home?')).toBeVisible();
    await page.click('button:has-text("Calculate My Footprint")');

    // 5. Results Page
    await expect(page.locator('text=Your Carbon Footprint')).toBeVisible();
    await expect(page.locator('text=Actionable Tips for You')).toBeVisible();

    // 6. View Dashboard
    await page.click('button:has-text("View My Dashboard")');
    await expect(page).toHaveURL(/.*dashboard/);

    // 7. Verify Dashboard Elements
    await expect(page.locator('text=Daily Impact Tracker')).toBeVisible();
    await expect(page.locator('text=Total Calculations')).toBeVisible();
    
    // Verify calculation history has at least 1 entry
    const calculationScore = page.locator('text=Latest Score').locator('..').locator('.text-2xl');
    await expect(calculationScore).toBeVisible();
  });
});
