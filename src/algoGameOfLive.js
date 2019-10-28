function algoGameOfLife(height, width, inputState) {
  // check the input
  const invalideRow = inputState.filter((str) => str.length !== width);
  if (height !== inputState.length || invalideRow.length !== 0) {
    return 'Input error';
  }

  const liveCell = '*';
  const deadCell = '.';
  const outputState = inputState.slice();

  function replaceChar(y, x, cell) {
    return outputState[y].slice(0, x) + cell + outputState[y].slice(x + 1);
  }

  function rules(y, x) {
    const initialI = x === 0 ? 0 : -1;
    const initialJ = y === 0 ? 0 : -1;
    const maxI = x === width - 1 ? 1 : 2;
    const maxJ = y === height - 1 ? 1 : 2;

    // finde the number of dead and live cells
    let liveCells = 0;
    for (let j = initialJ; j < maxJ; j++) {
      for (let i = initialI; i < maxI; i++) {
        if (inputState[y + j][x + i] === liveCell) {
          liveCells += 1;
        }
      }
    }

    // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    // 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
    // 3. Any live cell with two or three live neighbours lives on to the next generation.
    if (inputState[y][x] === liveCell && (liveCells <= 2 || liveCells > 3 + 1)) {
      outputState[y] = replaceChar(y, x, deadCell);
      // 4. Any dead cell with exactly three live neighbours becomes a live cell
    } else if (inputState[y][x] === deadCell && liveCells === 3) {
      outputState[y] = replaceChar(y, x, liveCell);
    }
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      rules(i, j);
    }
  }
  return outputState;
}

export default algoGameOfLife;