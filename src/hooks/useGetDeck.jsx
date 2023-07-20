import { useState, useEffect } from "react";
import cardsTheme from '../mooks/cards.json'

export function useGetDeck () {
    const [theme, setTheme] = useState("")
    const [cards, setCards] = useState([]) // 
  
  
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
    return {theme, setTheme, cards, setCards, handleClick}
  }