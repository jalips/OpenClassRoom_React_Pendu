import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHABET_SPLIT = ALPHABET.split('')

const GameZone = ({ word }) => <div className="gameZone">{word}</div>

const GameTry = ({ nbTry }) => <div className="gameTry">You try : {nbTry} time</div>
GameTry.propTypes = {
  nbTry: PropTypes.number.isRequired,
}

const GameKeyBoard = ({ letter, index, onClick }) =>
    <button onClick={() => onClick(index, letter)} className="gameKeyBoard">{letter}</button>

class App extends Component {
  state = {
    wordToFind: "QUEEN",
    currentUsedLetters: new Set (['E']),
    nbTry: 0,
  }

  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
        (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  // Arrow fx for binding
  handleKeyClick = (index, letter) => {
    const { nbTry, currentUsedLetters } = this.state

    console.log("click on "+index+ "  "+letter)

    // Increment one try
    const newNbTry = nbTry + 1
    this.setState({ nbTry: newNbTry })

    // Add to current array
    currentUsedLetters.add(letter)
    //this.setState({ currentUsedLetters: [currentUsedLetters] })

    //this.setState({ currentUsedLetters: [...currentUsedLetters, ...currentUsedLetters] })
  }

  render() {
    const { wordToFind, currentUsedLetters, nbTry } = this.state

    return (
      <div className="App">
        <GameZone word={this.computeDisplay(wordToFind, currentUsedLetters)} />

        <GameTry nbTry={nbTry} />

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
