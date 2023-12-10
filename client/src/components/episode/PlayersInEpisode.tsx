import React, { useState } from 'react'
import { Block, Button } from 'react-bulma-components'
import { createEpisodePlayers } from '../../api'
import PlayerTable from '../common/playerTable'

type PlayersInEpisodeProps = {
  playersInEpisode: any[]
  season: any
  episode: any
  tribes: any[]
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayersInEpisode: React.FC<PlayersInEpisodeProps> = ({ 
  playersInEpisode, season, episode, tribes, refreshAlliances,
  toggleRefreshEpisode, setRefreshAlliances 
}) => {
  // TODO: This should be a property of the season
  const renderShotInTheDark = season.order > 40
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  const initPlayersInEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (disableAjax === true) return
    setDisableAjax(true)

    const initPlayersInEpisodeCallback = (d: any) => {
      setDisableAjax(false)
      toggleRefreshEpisode()
    }

    createEpisodePlayers(episode.id, episode.premiere, initPlayersInEpisodeCallback)
  }

  return (
    <>
      <Block>
        <PlayerTable
          playerStatus='playing'
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
          playerStatus='redemption'
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
        <PlayerTable
          playerStatus='edge'
          seasonId={season.id}
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
        <PlayerTable
          playerStatus='eliminated'
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
        disabled={disableAjax}
      >
        Reset Players
      </Button>
    </>
  )
}

export default PlayersInEpisode