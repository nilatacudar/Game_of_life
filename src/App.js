import React from 'react';
import './App.css';
import GraphicRepresentation from './graphicRepresentation';

class App extends React.Component {
  constructor(props){
    super(props);
    const min = 1;
    this.state = {
      height: min, 
      width: min,
      max: 20,
      min
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleSubmit(event){
    event.preventDefault();
    const { height, width, max, min } = this.state;
    if( !height || !width || height < min || width < min || height > max || width > max ){
      this.setState({ error: `Please fill in the fields numbers between ${min} and ${max}.`, generateCells: undefined});
    }else{
      this.setState({ error: '', generateCells: { height, width}});
    }
  }

  handleReset(event){
    event.preventDefault();
    this.setState((state)=>({
      height: state.min,
      width: state.min,
      error: '',
      generateCells: undefined
    }));
  }

  setValue(event){
    event.preventDefault();
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleError(){ 
    const { error } = this.state;
    if(error){
      return <div>{error}</div>
    }
    return null;
  }

  render() {
    const { height, width, min, max, error, generateCells} = this.state;
    const showCells = !!(generateCells && !error)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Game of life</h1>
        </header>

        <section className="content">
          <div className="description font">
            <p>
            The Game of Life is a 'cellular automaton' invented by Cambridge mathematician John Conway.
                It consists of a collection of cells which, based on a few mathematical rules, can live, die or multiply. 
            </p>
            <p>
            The user can create a two dimensional grid of cells by filling in the form below and clicking on the "Submit" button. 
            At begining, all cells are dead (empty). The user must click on the cells with a mouse to create cells alive (filled). 
            Then, he/she must click the "Next generation" button to see a new generation of cells corresponding to one iteration of the rules below:          </p>
            <ul>
              <li>
                any live cell with fewer than two live neighbours dies, as if caused by underpopulation,
              </li>
              <li>
                any live cell with more than three live neighbours dies, as if by overcrowding,
              </li>
              <li>
                any live cell with two or three live neighbours lives on to the next generation,
              </li>
              <li>
                any dead cell with exactly three live neighbours becomes a live cell.
              </li>
            </ul>
          </div>
       
          <div className="form-cells">
            <div className='inline'>
              <form onSubmit={this.handleSubmit} >
                <label htmlFor="height">Number of rows:</label>
                <input 
                  type="number" 
                  name="height" 
                  min={min} max={max} 
                  onChange={this.setValue}
                  value={height}
                /><br />
                <label htmlFor="width">Number of columns:</label>
                <input 
                  type="number" 
                  name="width" 
                  min={min} max={max} 
                  onChange={this.setValue}
                  value={width}
                /><br />
                {this.handleError() }
                <button type="submit">Submit</button>
                <button type="reset" onClick={this.handleReset}>Reset</button>
              </form>
            </div>
          

          {showCells && <GraphicRepresentation {...generateCells} />}
          </div>

        </section>

        
        <footer className='centre footer'>
          <p>{'Source exercise: '}
            <a
              className="link"
              href="http://codingdojo.org/kata/GameOfLife"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coding Dojo
          </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
