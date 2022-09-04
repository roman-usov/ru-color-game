// @ts-check
import { rgbColors } from '../../cypress/e2e/testHelpers';

const { test, expect } = require('@playwright/test');

test.describe('Given the game has loaded', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: 'src/__tests__/pretest.js' });
    await page.goto('/');
  });

  test.describe('When I look at the game', () => {
    // test('Then I see that the format selected by default is RGB', async ({
    //   page,
    // }) => {
    //   // Expect the RGB radio button to have the checked class.
    //   await expect(page.locator('id=rgb')).toHaveClass(
    //     'format-radio-btn checked'
    //   );
    // });

    test('Then I see that the 1st color to guess is RGB', async ({ page }) => {
      // Expect the displayed color to guess to be RGB.
      await expect(page.locator('.color-string')).toHaveText(
        'rgb(104, 104, 99)'
      );
    });
  });
});
