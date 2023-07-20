import Confetti from 'react-confetti';


export const WinnerCelebration = ({isWinner}) => {
  
  return (
    <>
      {isWinner && (

        <div className="confetti-container">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </>
  )
}