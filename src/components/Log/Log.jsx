import React from 'react'

const Log = ({turns}) => {
  return (
    <ol id='log'>
        {turns.map((move, index) => {
            return <li key={index}>player:{move.player} selected, col: {move.square.col}, row: col: {move.square.row}</li>
        })}
    </ol>
  )
}

export default Log