import React, { useState } from "react"
import { Button, Columns, Tag } from "react-bulma-components"
import { createAlliancePlayer, deleteAlliancePlayer } from "../../api"
import PlayerSearch from "../common/playerSearch"
import { IAlliance, IPlayer, IPlayerInEpisode } from "../../models"

type AlliancePlayersFormProps = {
  alliance: IAlliance
  episodeId: number
  seasonId: number
  allianceCallback: (data?: IAlliance[]) => void
}

const AlliancePlayersForm: React.FC<AlliancePlayersFormProps> = ({ 
  alliance, episodeId, seasonId, allianceCallback 
}) => {
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const formData = {
    playerId: 0,
    episodeId: episodeId,
  }

  const alliancePlayerCallback = (data?: IAlliance) => {
    setDisableAjax(false)
    allianceCallback()
  }

  const selectPlayer = (player: IPlayer) => {
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

  const renderPlayers = (): React.ReactNode => {
    if (!alliance.alliancePlayers) return null

    const playersInEpisode = alliance.alliancePlayers
      .filter((pie: IPlayerInEpisode) => pie.episodeId === episodeId)
  
    return playersInEpisode.map((pie: IPlayerInEpisode) => (
      <Tag 
        key={pie.id} 
        color="info" 
        size={'medium'}
      >
        {pie.player?.name}
        <Button 
          remove 
          size={'small'} 
          onClick={() => removePlayer(pie.id)} 
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