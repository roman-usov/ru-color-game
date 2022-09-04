export function randomNumber(range) {
  return Math.floor(Math.random() * range);
}

export function colorFormat(color) {
  if (/rgb/g.test(color)) return 'rgb';
  if (/hsl/g.test(color)) return 'hsl';
  return 'hex';
}

export function shuffle(arr) {
  const arrToShuffle = [...arr];
  let remainingElementsToShuffle = arrToShuffle.length;
  let randomElement;
  let currentLastElement;

  while (remainingElementsToShuffle) {
    // pick a random element from the array
    randomElement = Math.floor(Math.random() * remainingElementsToShuffle);

    remainingElementsToShuffle -= 1;

    // save the element corresponding to the i = value of the remaining elements to shuffle in a variable
    currentLastElement = arrToShuffle[remainingElementsToShuffle];

    // replace the element corresponding to the i = value of the remaining elements to shuffle with the found random element
    arrToShuffle[remainingElementsToShuffle] = arrToShuffle[randomElement];

    // replace the moved random element with the saved element corresponding to the i = value of the remaining elements to shuffle
    arrToShuffle[randomElement] = currentLastElement;
  }

  return arrToShuffle;
}

/*
  1)
  [1, 2, 3]

  randomElement = 0

  remainingElementsToShuffle = 2

  currentLastElement = 3

  arrToShuffle[remainingElementsToShuffle] = 3

  arrToShuffle[randomElement] = 1

  [1, 2, 1]

  arrToShuffle[randomElement] = 1

  currentLastElement = 3

  [3, 2, 1]

  2)
  randomElement = 1

  remainingElementsToShuffle = 1

  currentLastElement = 2

  arrToShuffle[remainingElementsToShuffle] = 2

  arrToShuffle[randomElement] = 2

  [3, 2, 1]

  arrToShuffle[randomElement] = 2

  currentLastElement = 2

  [3, 2, 1]

  3)
  randomElement = 0

  remainingElementsToShuffle = 0

  currentLastElement = 3

  arrToShuffle[remainingElementsToShuffle] = 3

  arrToShuffle[randomElement] = 3

  [3, 2, 1]

  arrToShuffle[randomElement] = 3

  currentLastElement = 3

  [3, 2, 1]
 */
