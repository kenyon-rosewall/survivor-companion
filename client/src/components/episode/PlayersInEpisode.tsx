import React, { useState } from 'react'
import { Block, Button } from 'react-bulma-components'
import { createEpisodePlayers } from '../../api'
import PlayerTable from '../common/playerTable'
import { IEpisode, IPlayerInEpisode, ISeason, ITribe, PlayerStatusEnum } from '../../models'

type PlayersInEpisodeProps = {
  playersInEpisode: IPlayerInEpisode[]
  season?: ISeason
  episode?: IEpisode
  tribes: ITribe[]
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayersInEpisode: React.FC<PlayersInEpisodeProps> = ({ 
  playersInEpisode, season, episode, tribes, refreshAlliances,
  toggleRefreshEpisode, setRefreshAlliances 
}) => {
  // TODO: This should be a property of the season
  const renderShotInTheDark = Number(season?.order) > 40 ?? false
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  const initPlayersInEpisodeCallback = (data?: IPlayerInEpisode[]) => {
    setDisableAjax(false)
    toggleRefreshEpisode()
  }
  
  const initPlayersInEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (disableAjax === true || !episode) return
    setDisableAjax(true)

    createEpisodePlayers(episode.id, episode.premiere, initPlayersInEpisodeCallback)
  }

  if (!season) return null

  return (
    <>
      <Block>
        <PlayerTable
          playerStatus={PlayerStatusEnum.Playing}
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          showFilter
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
        <PlayerTable
          playerStatus={PlayerStatusEnum.Redemption}
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
        <PlayerTable
          playerStatus={PlayerStatusEnum.Edge}
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
        <PlayerTable
          playerStatus={PlayerStatusEnum.Eliminated}
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
      </Block>

      <Button
        color='danger'
        onClick={initPlayersInEpisode}
        className='is-pulled-right'
      >
        Reset Players
      </Button>
    </>
  )
}

export default PlayersInEpisode