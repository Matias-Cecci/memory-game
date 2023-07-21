import { useEffect, useState } from 'react'
import { backgroundImages, cardsBackImages } from './assets/images.js'
import { useGetDeck } from './hooks/useGetDeck'
import Confetti from 'react-confetti';

import { useCardTheme } from './hooks/useCardTheme'
import { WinnerCelebration } from './components/WinnerCelebration.jsx'
import { Menu } from './components/Menu'
import './index.css'

function App() {
  const { theme, setTheme, cards, setCards, handleClick } = useGetDeck()
  const [cardBackUrl, setCardBackUrl] = useState("");
  const [selected, setSelected] = useState([])
  const [guessed, setGuessed] = useState([])
  const [moves, setMoves] = useState(0)
  const [isWinner, setIsWinner] = useState(false);

  useCardTheme(theme, backgroundImages, cardsBackImages, setCardBackUrl);

  const restartGame = () => {
    setSelected([]);
    setGuessed([]);
    setMoves(0)
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5))
    setIsWinner(false);
  }

  const goBack = () => {
    setTheme()
    restartGame()
    setCardBackUrl('')
    setIsWinner(false)
  }

  const cardSelect = (cardId) => {
    if (selected.includes(cardId) || guessed.includes(cardId)) {
      return;
    }

    setSelected((prevSelected) => {
      let newSelected = [...prevSelected, cardId];

      if (newSelected.length > 2) {
        newSelected = [cardId];
      }
      if (newSelected.length === 2) {
        const selectedCards = cards.filter((card) =>
          newSelected.includes(card.id)
        );
        if (selectedCards[0].url === selectedCards[1].url) {
          setGuessed((prevGuessed) => [...prevGuessed, ...newSelected]);


        } else {
          setTimeout(() => {
            setSelected([]);
          }, 700);
        }
      }
      return newSelected;
    });
  }

  useEffect(() => {
    if (selected.length === 2) {
      setMoves((moves) => moves + 1);
    }
  }, [selected]);

  useEffect(() => {
    if (guessed.length !== 0 && (guessed.length) === cards.length) {
      setIsWinner(true)
    }
  }, [guessed])


  return (
    <div className={`container ${theme}`}>
      <h1>Memory Game</h1>
      <div className='container-game'>
        {isWinner && (
          <>
            <div className="confetti-container">
              <Confetti />
            </div>

            <div className="win-container">
              <h2>YOU WIN!</h2>
              <h3>Moves: {moves}</h3>
              <div className="restart-game">
                <button onClick={restartGame}> Restart Game </button>
                <button onClick={goBack}> Go Back </button>
              </div>
            </div>
          </>
        )}
        {!isWinner && theme ? (
          <>
            <div className='board-game'>
              <h3>Moves: {moves}</h3>
            </div>
            <ul>
              {cards?.map((card) => {
                const isSelected = selected.includes(card.id);
                const isGuessed = guessed.includes(card.id);
                return (
                  <li
                    key={card.id}
                    onClick={() => cardSelect(card.id)}
                    className={`${isSelected ? 'selected' : ''} ${isGuessed ? 'guessed' : ''}`}
                  >
                    <img
                      src={isGuessed || isSelected ? card.url : cardBackUrl}
                      alt='image'
                    />
                  </li>
                )
              })}
            </ul>
            <div className='restart-game'>
              <button onClick={restartGame}> Restart Game </button>
              <button onClick={goBack}> Go Back </button>
            </div>
          </>
        ) : null}

        <Menu
          handleClick={handleClick}
          theme={theme}
          isWinner={isWinner}
        />
      </div>
    </div>
  )
}

export default App
