import React from 'react';
import MineSweeper from './Game/Board';
import withNavbar from '../../../../HOC/withNavbar';

const MineSweeperGame = () => {
  return (
    <div>
        <MineSweeper/>
    </div>
  );
}

export default withNavbar(MineSweeperGame);
