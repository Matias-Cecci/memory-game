export const Menu = ({handleClick, isWinner, theme}) => {
    return(
        <>
        {!isWinner && !theme && (
            <>
              <h2 className="h2-menu">Choose cards theme</h2>
              <div className="choose-buttons-container">
                <button onClick={() => handleClick('dev')}>Devs Cards</button>
                <button onClick={() => handleClick('flags')}>Flags Cards</button>
                <button onClick={() => handleClick('badges')}>Badges Cards</button>
              </div>
            </>
        )}
        </>
    )
}