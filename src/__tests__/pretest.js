import { testColors } from '../script';
import { rgbColors } from '../../cypress/e2e/testHelpers';

testColors.colors = rgbColors;
console.log(testColors);
