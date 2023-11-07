import React, { useState } from "react";

function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  const handleEditingClick = () => {
    // If your new state depends on your previous state value, you should not update the state like this
    // setIsEditing(!isEditing);

    // Instead, pass a function to your state updating function
    setIsEditing((wasEditing) => !wasEditing);
    if (isEditing) onChangeName(symbol, playerName);
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditingClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

export default Player;
