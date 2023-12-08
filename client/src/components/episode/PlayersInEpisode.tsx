import React, { useState } from 'react'
import { Block, Button } from 'react-bulma-components'
import PlayerTable from '../common/playerTable'

type PlayersInEpisodeProps = {
  playersInEpisode: any[]
  season: any
  episode: any
  tribes: any[]
  refreshPlayersInEpisode: boolean
  toggleRefreshEpisodeChildren: () => void
  toggleRefreshEpisode: () => void
}

const PlayersInEpisode: React.FC<PlayersInEpisodeProps> = ({ 
  playersInEpisode, season, episode, tribes, refreshPlayersInEpisode, 
  toggleRefreshEpisodeChildren, toggleRefreshEpisode 
}) => {
  const renderShotInTheDark = season.order > 40
  const [disableButton, setDisableButton] = useState<boolean>(false)

  const initPlayersInEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (episode.id === 0) return
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/episodes/${episode.id}/players`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ premiere: episode.premiere  })
    })
    .then(response => response.json())
    .then(data => {
      setDisableButton(false)
      toggleRefreshEpisode()
    })
    .catch(err => console.error('Error initializing players:', err))
  }

  console.log('refresh playersin episode')
  return (
    <>
      <Block>
        <PlayerTable
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          seasonId={season.id}
          toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
          toggleRefreshEpisode={toggleRefreshEpisode}
          renderShotInTheDark={renderShotInTheDark}
          playerStatus='playing'
          showFilter={true}
        />
        <PlayerTable
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          seasonId={season.id}
          toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
          toggleRefreshEpisode={toggleRefreshEpisode}
          renderShotInTheDark={renderShotInTheDark}
          playerStatus='redemption'
          showFilter={false}
        />
        <PlayerTable
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          seasonId={season.id}
          toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
          toggleRefreshEpisode={toggleRefreshEpisode}
          renderShotInTheDark={renderShotInTheDark}
          playerStatus='edge'
          showFilter={false}
        />
        <PlayerTable
          playersInEpisode={playersInEpisode}
          tribes={tribes}
          seasonId={season.id}
          toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
          toggleRefreshEpisode={toggleRefreshEpisode}
          renderShotInTheDark={renderShotInTheDark}
          playerStatus='eliminated'
          showFilter={false}
        />
      </Block>

      <Button
        color='danger'
        onClick={initPlayersInEpisode}
        className='is-pulled-right'
        disabled={disableButton}
      >
        Reset Players
      </Button>
    </>
  )
}

export default PlayersInEpisode