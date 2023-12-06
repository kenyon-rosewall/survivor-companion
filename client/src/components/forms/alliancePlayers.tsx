import React from "react"
import { Button, Columns, Tag } from "react-bulma-components"
import PlayerSearch from "../common/playerSearch"

type AlliancePlayersFormProps = {
  alliance: any
  episodeId: number
  seasonId: number
  callback: () => void
}

const AlliancePlayersForm: React.FC<AlliancePlayersFormProps> = ({ alliance, episodeId, seasonId, callback }) => {
  const formData = {
    playerId: 0,
    episodeId: episodeId,
  }

  const selectPlayer = (player: any) => {
    fetch(`http://localhost:5000/alliances/${alliance.id}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, playerId: player.id })
    })
    .then(response => {
      callback()
    })
    .catch(err => console.error('Error adding player to alliance:', err))
  }

  const removePlayer = (index: number) => {
    const alliancePlayerId = alliance.alliancePlayers[index].id
    fetch(`http://localhost:5000/alliances/${alliance.id}/players/${alliancePlayerId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then(response => {
      callback()
    })
    .catch(err => console.error('Error removing player from alliance:', err))
  }

  const renderPlayers = () => {
    return alliance.alliancePlayers
            .filter((player: any) => player.episodeId === episodeId)
            .map((player: any, index: number) => (
      <Tag key={index} color="info" size={'medium'}>
        {player.player?.name}
        <Button remove size={'small'} onClick={() => removePlayer(index)} />
      </Tag>
    ))
  }

  return (
    <>
      <Columns>
        <Columns.Column size={6}>
          <PlayerSearch
            formDisabled={false}
            seasonId={seasonId}
            handleSelectPlayer={selectPlayer}
          />
        </Columns.Column>

        <Columns.Column>
          <Tag.Group>
            {renderPlayers()}
          </Tag.Group>
        </Columns.Column>
      </Columns>
    </>
  )
}

export default AlliancePlayersForm