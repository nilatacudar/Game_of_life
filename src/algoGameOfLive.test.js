/* eslint-disable no-undef */
import algoGameOfLife from './algoGameOfLive';


test('Should return an : "Input error" if the mumber of rows and columns no match with the numbers of cells.', () => {
  expect(algoGameOfLife(4, 8, ['.......', '....*...', '...**...', '........']))
    .toBe('Input error');
  expect(algoGameOfLife(4, 8, ['........', '....*..', '...**...', '........']))
    .toBe('Input error');
  expect(algoGameOfLife(4, 8, ['........', '....*...', '...**...']))
    .toBe('Input error');
});

test('Should return a new generation of cells, coresponding to one iteration of the rules.', () => {
  expect(algoGameOfLife(4, 8, ['........', '....*...', '...**...', '........']))
    .toStrictEqual(['........', '...**...', '...**...', '........']);
  expect(algoGameOfLife(5, 5, ['.....', '..*..', '..*..', '..*..', '.....']))
    .toStrictEqual(['.....', '.....', '.***.', '.....', '.....']);
  expect(algoGameOfLife(4, 4, ['....', '.**.', '.**.', '....']))
    .toStrictEqual(['....', '.**.', '.**.', '....']);
  expect(algoGameOfLife(6, 6, ['......', '.**...', '.**...', '...**.', '...**.', '......']))
    .toStrictEqual(['......', '.**...', '.*....', '....*.', '...**.', '......']);
  expect(algoGameOfLife(6, 6, ['......', '......', '..***.', '.***..', '......', '......']))
    .toStrictEqual(['......', '...*..', '.*..*.', '.*..*.', '..*...', '......']);
});