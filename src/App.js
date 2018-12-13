import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {

    // Produit une représentation textuelle de l’état de la partie,
    // chaque lettre non découverte étant représentée par un _underscore_.
    // (CSS assurera de l’espacement entre les lettres pour mieux
    // visualiser le tout).
    function computeDisplay(phrase, usedLetters) {
      return phrase.replace(/\w/g,
          (letter) => (usedLetters.has(letter) ? letter : '_')
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
