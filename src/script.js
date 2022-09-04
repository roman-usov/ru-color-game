import { generateGameParams, COLOR_FORMAT } from './colorGame';
import { colorFormat } from './utilities';

const colorSlateEls = document.querySelectorAll('[data-color-slate]');
const colorStringEl = document.querySelector('.color-string');
const resultsEls = document.querySelector('.results');
const gameResultEl = document.querySelector('.result');
const colorGridEl = document.querySelector('.color-grid');
const colorFormatEl = document.querySelector('.radio-group-format');
const difficultyEl = document.querySelector('.radio-group-difficulty');
const colorFormatFieldSet = document.querySelector('[data-color-format-set]');
const difficultyFieldSet = document.querySelector('[data-difficulty-set]');
const nextGameBtn = document.querySelector('.next-game');
// const formatRadioButtonEls = document.querySelectorAll('.format-radio-btn');

// console.log(document.querySelectorAll('input[type=radio]'));

let testColors;

if (process.env.NODE_ENV !== 'production' && window.testColors) {
  testColors = window.testColors;
}

console.log(testColors);

let gameParams = testColors ?? generateGameParams();
console.log('initial game params', gameParams);

function markButtonAsChecked(id) {
  document.getElementById(`${id}`).checked = true;
  document.getElementById(`${id}`).classList.add('checked');
}

function renderColorsGame({ colors, colorToGuess, difficultyLevel }) {
  colorSlateEls.forEach((slate, i) => {
    slate.style.backgroundColor = `${colors[i]}`;
    slate.dataset.color = `${colors[i]}`;
    slate.dataset.difficulty = `${difficultyLevel}`;
  });

  colorStringEl.textContent = colorToGuess;

  resultsEls.classList.add('hide');

  if (colorFormat(colorToGuess) === COLOR_FORMAT.HEX) {
    markButtonAsChecked(COLOR_FORMAT.HEX);
  } else if (colorFormat(colorToGuess) === COLOR_FORMAT.HSL) {
    markButtonAsChecked(COLOR_FORMAT.HSL);
  }
}

function endRound(winFlag) {
  gameResultEl.textContent = winFlag ? 'Correct' : 'Wrong';
  colorSlateEls.forEach((slate) => {
    slate.classList.add('wrong');
    slate.disabled = true;
  });

  colorFormatFieldSet.disabled = true;
  difficultyFieldSet.disabled = true;

  const correctBtn = document.querySelector(
    `[data-color="${gameParams.colorToGuess}"]`
  );
  correctBtn.classList.remove('wrong');

  resultsEls.classList.remove('hide');
}

function resetGame() {
  const formatBtnChecked = colorFormatEl.querySelector('.checked');
  const difficultyBtnChecked = difficultyEl.querySelector('.checked');

  colorSlateEls.forEach((slate) => {
    slate.classList.remove('wrong');
    slate.disabled = false;
  });

  colorFormatFieldSet.disabled = false;
  difficultyFieldSet.disabled = false;

  gameParams =
    testColors ??
    generateGameParams({
      colorFormat: formatBtnChecked.value,
      difficultyLevel: difficultyBtnChecked.value,
    });

  renderColorsGame(gameParams);
}

renderColorsGame(gameParams);

nextGameBtn.addEventListener('click', () => {
  resetGame();
});

colorGridEl.addEventListener('click', (e) => {
  const element = e.target;

  if (!element.matches('[data-color-slate]')) return;

  const won = element.dataset.color === gameParams.colorToGuess;

  endRound(won);
});

colorFormatEl.addEventListener('click', (e) => {
  const element = e.target;

  if (!element.closest('.radio-group-format') || element.nodeName !== 'INPUT')
    return;

  // const radioInput =
  //   element.nodeName === 'INPUT'
  //     ? element
  //     : document.getElementById(`${element.getAttribute('for')}`);

  // if (radioInput.classList.contains('checked')) {
  //   return;
  // }

  if (element.classList.contains('checked')) return;

  const btnCheckedEarlier = colorFormatEl.querySelector('.checked');
  btnCheckedEarlier.classList.toggle('checked');

  element.classList.toggle('checked');

  resetGame();
});

difficultyEl.addEventListener('click', (e) => {
  const element = e.target;

  if (
    !element.closest('.radio-group-difficulty') ||
    element.nodeName !== 'INPUT'
  )
    return;

  if (element.classList.contains('checked')) return;

  const btnCheckedEarlier = difficultyEl.querySelector('.checked');
  btnCheckedEarlier.classList.toggle('checked');

  element.classList.toggle('checked');

  resetGame();
});
