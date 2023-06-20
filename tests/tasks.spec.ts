import { test, expect } from '@playwright/test';

test('open page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Solid demo/);
});

test('adding a task', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000)
  await page.type('input[aria-label="task input text"]', 'Plant bananas', {delay:100})
  await page.press('input[aria-label="task input text"]', 'Enter')
  await page.waitForTimeout(1000)
  await expect(page).toHaveTitle(/Solid demo/);
});
