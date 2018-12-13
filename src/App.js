import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHABET_SPLIT = ALPHABET.split('')
const ARRAY_OF_WORD = ["PENDU", "CHAT", "OC", "CLAVIER"]

const GameZone = ({ word }) => <div className="gameZone">{word}</div>
GameZone.propTypes = {
  word: PropTypes.string.isRequired,
}

const GameTry = ({ nbTry }) => <div className="gameTry">You try : {nbTry} time(s)</div>
GameTry.propTypes = {
  nbTry: PropTypes.number.isRequired,
}

const GameKeyBoard = ({ letter, index, status, onClick }) =>
    <button onClick={() => onClick(index, letter)} className={`gameKeyBoard ${status}`}>{letter}</button>
GameKeyBoard.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  status: PropTypes.oneOf([
    '',
    'gameKeyBoardUsed',
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
}

class App extends Component {
  state = {
    won: false,
    wordToFind: ARRAY_OF_WORD[Math.floor(Math.random() * Math.floor(ARRAY_OF_WORD.length))],
    currentUsedLetters: new Set ([]),
    nbTry: 0,
    scoreTotal: 0,
  }


  computeDisplay(phrase, usedLetters) {
    return phrase.replace(/\w/g,
        (letter) => (usedLetters.has(letter) ? letter : '_')
    )
  }

  // Arrow fx for binding
  handleKeyClick = (index, letter) => {
    const { nbTry, currentUsedLetters, wordToFind, scoreTotal } = this.state

    // Increment one try
    const newNbTry = nbTry + 1
    this.setState({ nbTry: newNbTry })

    // Check if letter is already in array
    if(!currentUsedLetters.has(letter)){

      // Add to current array
      const newCurrentUsedLetters = currentUsedLetters.add(letter)
      this.setState({ currentUsedLetters: currentUsedLetters.add(letter) })

      // Add is won
      this.computeDisplay(wordToFind, newCurrentUsedLetters).search("_") < 0 && this.setState({ won: true })

      // Calcul Score // TODO : Gérer le cas avec deux fois la même lettre dans un mot
      const newScore = wordToFind.search(letter) < 0 ? scoreTotal - 1 : scoreTotal + 1
      this.setState({ scoreTotal: newScore })
    }

  }

  // Arrow fx for binding
  handleResetClick = () => {
    this.setState({
      won: false,
      wordToFind: ARRAY_OF_WORD[Math.floor(Math.random() * Math.floor(ARRAY_OF_WORD.length))],
      currentUsedLetters: new Set ([]),
      nbTry: 0,
    });
  }

  getStatusForKeyboard(letter) {
    const { currentUsedLetters } = this.state
    return currentUsedLetters.has(letter) ? 'gameKeyBoardUsed' : ''
  }

  render() {
    const { wordToFind, currentUsedLetters, nbTry, won, scoreTotal } = this.state


    console.log(wordToFind)

    return (
      <div className="App">
        <h1>React Pendu</h1>
        <ul>
          <li>Letter present : 2 points</li>
          <li>Letter not present : -1 point</li>
        </ul>

        <div><strong>SCORE : { scoreTotal }</strong></div>

        <GameZone word={this.computeDisplay(wordToFind, currentUsedLetters)} />

        {
          won ? <div><h3>Vous avez gagné</h3><button onClick={this.handleResetClick}>Reset</button></div> :
              <div className="gameKeyBoards">
                {ALPHABET_SPLIT.map((letter, index) => (
                    <GameKeyBoard
                        letter={letter}
                        status={this.getStatusForKeyboard(letter)}
                        index={index}
                        key={index}
                        onClick={this.handleKeyClick}
                    />
                ))}
              </div>
        }

        {
          nbTry > 0 && <GameTry nbTry={nbTry} />
        }

      </div>
    );
  }
}

export default App;
