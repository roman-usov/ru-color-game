import { randomNumber, shuffle } from './utilities';

const randomColor = require('randomcolor');

export const NUMBER_OF_COLORS = 6;
export const DIFFICULTY = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };
export const COLOR_FORMAT = { RGB: 'rgb', HEX: 'hex', HSL: 'hsl' };
export const PERCENTAGE_FOR_MEDIUM_DIFFICULTY = 0.5;

function generateRandomColors(colorRange, colorFormat, difficultyLevel) {
  if (difficultyLevel === DIFFICULTY.MEDIUM) {
    console.log('medium difficulty');
    const threeTrulyRandomColors = randomColor({
      count: colorRange * PERCENTAGE_FOR_MEDIUM_DIFFICULTY,
      format: colorFormat,
      hue: 'random',
      luminosity: 'random',
    });

    const threeCloseColors = randomColor({
      count: colorRange * PERCENTAGE_FOR_MEDIUM_DIFFICULTY,
      format: colorFormat,
      hue: randomColor({
        count: 1,
        format: colorFormat,
        hue: 'random',
        luminosity: 'random',
      }),
      luminosity: 'random',
    });

    return shuffle([...threeTrulyRandomColors, ...threeCloseColors]);
  }

  if (difficultyLevel === DIFFICULTY.HARD) {
    console.log('hard difficulty');
    return randomColor({
      count: colorRange,
      format: colorFormat,
      hue: randomColor({
        count: 1,
        format: colorFormat,
        hue: 'random',
        luminosity: 'random',
      }),
      luminosity: 'random',
    });
  }

  console.log('light difficulty');
  return randomColor({
    count: colorRange,
    format: colorFormat,
    hue: 'random',
    luminosity: 'random',
  });
}

function selectColorToGuess(colorSet, colorRange) {
  return colorSet[randomNumber(colorRange)];
}

export function generateGameParams({
  colorRange = NUMBER_OF_COLORS,
  colorFormat = COLOR_FORMAT.RGB,
  difficultyLevel = DIFFICULTY.EASY,
} = {}) {
  const colors = generateRandomColors(colorRange, colorFormat, difficultyLevel);
  const colorToGuess = selectColorToGuess(colors, colorRange);
  return {
    colors,
    colorToGuess,
    difficultyLevel,
  };
}
