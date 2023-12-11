import React, { useState } from "react"
import { Button, Columns, Tag } from "react-bulma-components"
import { createAlliancePlayer, deleteAlliancePlayer } from "../../api"
import PlayerSearch from "../common/playerSearch"

type AlliancePlayersFormProps = {
  alliance: any
  episodeId: number
  seasonId: number
  allianceCallback: () => void
}

const AlliancePlayersForm: React.FC<AlliancePlayersFormProps> = ({ 
  alliance, episodeId, seasonId, allianceCallback 
}) => {
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const formData = {
    playerId: 0,
    episodeId: episodeId,
  }

  const alliancePlayerCallback = (d?: any) => {
    setDisableAjax(false)
    allianceCallback()
  }

  const selectPlayer = (player: any) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    formData.playerId = player.id
    createAlliancePlayer(alliance.id, formData, alliancePlayerCallback)
  }

  const removePlayer = (alliancePlayerId: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    deleteAlliancePlayer(alliance.id, alliancePlayerId, alliancePlayerCallback)
  }

  const renderPlayers = () => {
    const players = alliance.alliancePlayers
      .filter((player: any) => player.episodeId === episodeId)
  
    return players.map((player: any) => (
      <Tag 
        key={player.id} 
        color="info" 
        size={'medium'}
      >
        {player.player?.name}
        <Button 
          remove 
          size={'small'} 
          onClick={() => removePlayer(player.id)} 
        />
      </Tag>
    ))
  }

  return (
    <>
      <Columns>
        <Columns.Column 
          size={6}
        >
          <PlayerSearch
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