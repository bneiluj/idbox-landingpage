import React, { Component } from 'react';
import './App.css';
import Scanner from '../Scanner/Scanner';
import Textbox from '../Textbox/Textbox';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Scanner */}
        <div className="App-leftSubSection App-subSection">
          <div className="App-sectionInnerWrapper">
            <h2 className='m-b-15'>Scan Card</h2>
            <Scanner />
          </div>
        </div>
        {/* Textbox */}
        <div className="App-rightSubSection App-subSection">
          <div className="App-sectionInnerWrapper">
            <h2 className='m-b-15'>Enter Phone Number</h2>
            <Textbox />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
