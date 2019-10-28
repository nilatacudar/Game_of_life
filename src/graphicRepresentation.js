import React from 'react';
import algoGameOfLife from './algoGameOfLive'

class GraphicRepresentation extends React.Component{
  constructor(props) {
    super(props);
    const column = [];
    const cells = [];
    for (let i = 0; i < props.width; i++){
      column.push('.');
    }
    for (let i = 0; i < props.height; i++) {
      cells.push(column.slice(0));
    }
    this.state = {
      cells  ,
      liveCell: '*',
      deadCell: '.',
      ...props
    }
    this.handleClickCell = this.handleClickCell.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if (props.width === state.width && props.height === state.height ){
      return null;
    }
    const column = [];
    const cells = [];
    for (let i = 0; i < props.width; i++) {
      column.push('.');
    }
    for (let i = 0; i < props.height; i++) {
      cells.push(column.slice(0));
    }
    return { cells, liveCell: '*', deadCell: '.', ...props}
    
  }

  handleClickCell(y, x){
    this.setState((state) => { 
      const { cells, liveCell, deadCell } = state;
      const tempCells = cells.slice(0);
      tempCells[y][x] = tempCells[y][x] === liveCell ? deadCell : liveCell;
      return ({ cells: tempCells})
    });
  }
  
  handleClickNext(){
    this.setState((state)=>{
      const tempCells = state.cells.map(row=> row.join(''));
      const newCells = algoGameOfLife(parseInt(state.height), parseInt(state.width), tempCells);
      if (Array.isArray(newCells)){
        return { cells: newCells.map(row => row.split('')) };
      }
        return null;
    });
  }

  render(){
    const { cells } = this.state;
    const rows = cells[0].length;
    return (
      <div className='inline'>
        <div>
          <div className="centre">
            <div style={{ display: 'grid', 'gridTemplateColumns': `repeat(${rows}, 1fr)` }}>
                {cells.map((row, yIndex) =>
                  row.map((cell, xIndex) =>
                    <div 
                      key={xIndex} 
                      className={"cell " + (cell === "*" ? "liveCell" : "")} 
                      onClick={()=>this.handleClickCell(yIndex, xIndex)}
                    ></div>
                  )
                )}
            </div>
          </div>
          <div className="centre">
            <button onClick={() => this.handleClickNext()}>Next generation</button>
          </div>
        </div>
      </div>
    )
  }
}

export default GraphicRepresentation;
