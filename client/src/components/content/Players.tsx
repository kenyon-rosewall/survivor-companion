import React from 'react'
import { Block } from 'react-bulma-components'
import PlayerForm from '../forms/player'

type PlayersProps = {
  seasonId: number,
  playerId: number
}

const Players: React.FC<PlayersProps> = ({ 
  seasonId, playerId 
}) => {
  const handleFormSubmit = (player: any) => {
    // TODO: update player in state
  }

  return (
    <Block
      className={ playerId === 0 ? 'is-hidden' : '' }
    >
      <PlayerForm
        formType='update'
        seasonId={seasonId}
        playerOnSeasonId={playerId}
        onSubmitComplete={handleFormSubmit}
      />
    </Block>
  )
}

export default Players