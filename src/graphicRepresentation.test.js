import React from "react";
import { shallow } from "enzyme";
import GraphicRepresentation from './graphicRepresentation';

const setUp = (props = {}) => {
  const component = shallow(<GraphicRepresentation {...props} />);
  return component;
};

const width = 4;
const height = 5;

const initialState = (function () {
  const column = [];
  const cells = [];
  for (let i = 0; i < width; i++) {
    column.push('.');
  }
  for (let i = 0; i < height; i++) {
    cells.push(column.slice(0));
  }
  return function () { return cells }
})();

it('Should render correctly', () => {
  const component = setUp({ width, height});
  const cells = initialState();
  expect(component.state('cells')).toEqual(cells);
});


it('Simulates click cell', () => {
  const component = setUp({ width, height });
  const cells = initialState();
  // get the first cell
  const cell = component.find('.cell').first();

  cell.simulate('click');
  cells[0][0] = '*';
  expect(component.state('cells')).toStrictEqual(cells);

  cell.simulate('click');
  cells[0][0] = '.';
  expect(component.state('cells')).toStrictEqual(cells);
});