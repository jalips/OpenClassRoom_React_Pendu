import React, { Component } from 'react';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHABET_SPLIT = ALPHABET.split('')

const GameZone = ({ word }) => <div className="gameZone">{word}</div>

const GameKeyBoard = ({ letter, index, onClick }) =>
    <button onClick={() => onClick(index, letter)} className="gameKeyBoard">{letter}</button>

class App extends Component {
  state = {
    wordToFind: "QUEEN",
    matchedLetter: new Set ([]),
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
        (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  // Arrow fx for binding
  handleKeyClick = (index, letter) => {

    console.log("click on "+index+ "  "+letter)

    return
  }

  render() {
    const { wordToFind, matchedLetter } = this.state

    return (
      <div className="App">
        <GameZone word={this.computeDisplay(wordToFind, matchedLetter)} />

        {ALPHABET_SPLIT.map((letter, index) => (
            <GameKeyBoard
                letter={letter}
                index={index}
                key={index}
                onClick={this.handleKeyClick}
            />
        ))}
      </div>
    );
  }
}

export default App;
