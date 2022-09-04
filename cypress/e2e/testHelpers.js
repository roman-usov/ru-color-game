import { DIFFICULTY } from '../../src/colorGame';

export const rgbColors = {
  colors: [
    'rgb(104, 104, 99)',
    'rgb(0, 33, 29)',
    'rgb(23, 30, 8)',
    'rgb(52, 50, 58)',
    'rgb(102, 64, 57)',
    'rgb(126, 186, 120)',
  ],
  colorToGuess: 'rgb(104, 104, 99)',
};

export const hexColors = {
  colors: ['#5b5757', '#445ec4', '#133815', '#3458e5', '#6daec4', '#070f0b'],
  colorToGuess: '#6daec4',
};

export const hslColors = {
  colors: [
    'hsl(51, 12.36%, 30.260000000000005%)',
    'hsl(160, 21.95%, 19.68%)',
    'hsl(307, 11.11%, 10.8%)',
    'hsl(126, 62.6%, 42.434999999999995%)',
    'hsl(87, 3.74%, 64.68%)',
    'hsl(126, 40.85%, 16.33%)',
  ],
  colorToGuess: 'hsl(87, 3.74%, 64.68%)',
};

export const rgbColorsMedium = {
  colors: [
    'rgb(104, 104, 99)',
    'rgb(0, 33, 29)',
    'rgb(23, 30, 8)',
    'rgb(52, 50, 58)',
    'rgb(102, 64, 57)',
    'rgb(126, 186, 120)',
  ],
  colorToGuess: 'rgb(104, 104, 99)',
  difficultyLevel: DIFFICULTY.MEDIUM,
};
