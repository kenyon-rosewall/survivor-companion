import React from 'react'
import PlayerForm from '../forms/player'

type PlayersProps = {
  seasonId: number,
  playerId: number
}

const Players: React.FC<PlayersProps> = ({ seasonId, playerId }) => {
  const handleFormSubmit = (player: any) => {
    // TODO: update player in state
  }

  return (
    <>
      <PlayerForm
        formType='update'
        seasonId={seasonId}
        playerOnSeasonId={playerId}
        onSubmitComplete={handleFormSubmit}
      />
    </>
  )
}

export default Players