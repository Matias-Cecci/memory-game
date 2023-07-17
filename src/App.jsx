import { useEffect, useState } from 'react'
import './index.css'
import cardsTheme from './mooks/cards.json'
import Confetti from 'react-confetti';

function App() {
  const [selected, setSelected] = useState([])
  const [guessed, setGuessed] = useState([])
  const [theme, setTheme] = useState("")
  const [cards, setCards] = useState([]) // 
  const [moves, setMoves] = useState(0)
  const [isWinner, setIsWinner] = useState(false);
  const [cardBackUrl, setCardBackUrl] = useState("");


  useEffect(() => {
    if (selected.length === 2) {
      setMoves((moves) => moves + 1);
    }
  }, [selected]);

  const restartGame = () => {
    setSelected([]);
    setGuessed([]);
    setMoves(0)
    setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5))
    setIsWinner(false);
  }

  const cardSelect = (cardId) => {
    //Verifico si la carta ya se encuentra seleccionada o adivinada, para que no se pueda elegir nuevamente.
    if (selected.includes(cardId) || guessed.includes(cardId)) {
      return;
    }

    setSelected((prevSelected) => {
      //Verifico que solo se puedan escoger dos cartas
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
          //setCurrentPlayer(currentPlayer)


        } else {
          setTimeout(() => {
            setSelected([]);
          }, 1000);
        }
      }
      return newSelected;
    });
  }

  const duplicarImagenes = (array) =>
    array.flatMap((imagen, index) => [
      { id: `img${index * 2}`, url: imagen },
      { id: `img${index * 2 + 1}`, url: imagen }
    ]);

  useEffect(() => {
    if (theme) {
      const selectedTheme = cardsTheme[theme];
      const duplicatedCards = duplicarImagenes(selectedTheme);
      const randomCards = [...duplicatedCards].sort(() => Math.random() - 0.5);
      setCards(randomCards);
    }
  }, [theme]);

  const handleClick = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  const goBack = () => {
    setTheme()
    restartGame()
    setCardBackUrl('')

  }
  useEffect(() => {
    if (guessed.length !== 0 && guessed.length / 2 === cards.length) {
      setIsWinner(true)
    }
  }, [guessed])


  const pepe = 'https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=600'
  const pepe2 = 'https://cdn.pixabay.com/photo/2016/03/09/18/53/map-1247143_1280.jpg'
  useEffect(() => {
    let themeCardBackUrl = ""
    let imageUrl = "https://img.freepik.com/free-vector/hand-painted-abstract-painting-pattern-design_23-2148986984.jpg?w=740&t=st=1689541722~exp=1689542322~hmac=eec9c280e83ec9cefdcbb443a46b3f0a3195e274e649085df56baad9753f01c8";
    if (theme === "flags") {
      imageUrl = 'https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
      themeCardBackUrl = 'https://icongr.am/material/map-marker-radius.svg?size=88&color=ffffff'
    } else if (theme === "dev") {
      imageUrl = 'https://img.freepik.com/free-vector/stream-binary-code-design_53876-100689.jpg?w=996&t=st=1689540248~exp=1689540848~hmac=f446e260b95d1f60e01caba944bdad97a2c7bebdad12b213611e007778158b96';
      themeCardBackUrl = 'https://icongr.am/material/dev-to.svg?size=88&color=ffffff'
    } else if (theme === "badges") {
      imageUrl = "https://img.freepik.com/free-vector/gradient-style-football-field-background_23-2148995842.jpg?w=996&t=st=1689540716~exp=1689541316~hmac=3841a429b0f4c802c20fd22ebe0300f26aeb0a26186887fbc05f42a49bda1676";
      themeCardBackUrl = 'https://icongr.am/material/soccer.svg?size=88&color=ffffff'
    }
    document.body.style = `background-image : url(${imageUrl})`
    setCardBackUrl(themeCardBackUrl)
  }, [theme]);

  return (
    <div className={`container ${theme}`}>
      <h1>Memory Game</h1>
      <div className='container-game'>
        {isWinner && (
          <div className="win-container">
            <h2>YOU WIN!</h2>
            <h3>Moves: {moves}</h3>
            <div className="restart-game">
              <button onClick={restartGame}> Restart Game </button>
              <button onClick={goBack}> Go Back </button>
            </div>
          </div>
        )}
        {isWinner && (
          <div className="confetti-container">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
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
                      src={isGuessed || isSelected ? card.url : cardBackUrl }
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

        {!isWinner && !theme && (
          <>
            <h2>Choose cards theme</h2>
            <div className="choose-buttons-container">
              <button onClick={() => handleClick('dev')}>Devs Cards</button>
              <button onClick={() => handleClick('flags')}>Flags Cards</button>
              <button onClick={() => handleClick('badges')}>Badges Cards</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
