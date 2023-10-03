import React from 'react';
import MultiplayerT3 from '../TicTacToe/Multiplayer/index'
import withNavbar from '../../../../HOC/withNavbar';
const TicTacToe = () => {
  return (
    <div>
        <MultiplayerT3/>
    </div>
  );
}

export default withNavbar(TicTacToe);
