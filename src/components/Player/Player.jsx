import {useState} from 'react'

const Player = ({name, symbol, activePlayer, onNameChange}) => {
    
    const [isEditing, setisEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    const handleEditing = () => {
        setisEditing(prev => !prev);

        if(isEditing) {
          onNameChange(symbol, playerName);
        }
    }

    const handleNameChange = (event) => {
      setPlayerName(event.target.value)
    }
    
    const showField = isEditing ? <input type="text" value={playerName}  required onChange={handleNameChange}/> : <span className='player-name'>{playerName}</span>

  return (
    <>
      <li className={ activePlayer ? 'active' : undefined}>
        <span className='player'>
          {showField}
          <span className='player-symbol'>{symbol}</span>  
        </span>
        <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  )
}

export default Player