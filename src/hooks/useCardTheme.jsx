import { useEffect } from "react";

export function useCardTheme (theme, backgroundImages, cardsBackImages, setCardBackUrl){

    useEffect(() => {
        let cardBackThemeUrl = '';
        let imageUrl = backgroundImages.homeBackground;
    
        if (theme === 'flags') {
          imageUrl = backgroundImages.flagsBackground;
          cardBackThemeUrl = cardsBackImages.flagsCards;
        } else if (theme === 'dev') {
          imageUrl = backgroundImages.devBackground;
          cardBackThemeUrl = cardsBackImages.devCards;
        } else if (theme === 'badges') {
          imageUrl = backgroundImages.badgesBackground;
          cardBackThemeUrl = cardsBackImages.badgesCards;
        }
    
        document.body.style.backgroundImage = `url(${imageUrl})`;
        setCardBackUrl(cardBackThemeUrl);
    
        // Cleanup function
        return () => {
          document.body.style.backgroundImage = '';
          setCardBackUrl('');
        };
      }, [theme, backgroundImages, cardsBackImages, setCardBackUrl]);
      
    }