import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Block, Button } from 'react-bulma-components'
import Subtitle from '../common/subtitle'
import PlayerTable from '../common/playerTable'

type PlayersInEpisodeProps = {
  episodeId: number
  episode: any
  tribes: any[]
  refreshPlayersInEpisode: number
  playersCallback: () => void
}

const PlayersInEpisode: React.FC<PlayersInEpisodeProps> = ({ episodeId, episode, tribes, refreshPlayersInEpisode, playersCallback }) => {
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)
  const [playersInEpisode, setPlayersInEpisode] = useState<any[]>([])
  const [hasShotInTheDark, setHasShotInTheDark] = useState<any>(false)
  const [disableButton, setDisableButton] = useState<boolean>(false)
  // const [globalEditing, setGlobalEditing] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return

    fetch(`http://localhost:5000/episodes/${episodeId}/players`)
    .then(response => response.json())
    .then(data => {
      setPlayersInEpisode(data.data)
    })
    .catch(err => console.error('Error fetching players:', err))

    fetch(`http://localhost:5000/seasons/${selectedSeason}`)
    .then(response => response.json())
    .then(data => {
      setHasShotInTheDark(data.data.order > 40)
    })
    .catch(err => console.error('Error fetching season:', err))
  }, [selectedSeason, episodeId, refreshPlayersInEpisode])

  const initPlayersInEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (episodeId === 0) return
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/episodes/${episodeId}/players`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ premiere: episode.premiere  })
    })
    .then(response => response.json())
    .then(data => {
      setPlayersInEpisode(data.data)
      setDisableButton(false)
    })
    .catch(err => console.error('Error initializing players:', err))
  }

  return (
    <>
      <Subtitle>Players</Subtitle>
      
      <Block>
        <PlayerTable
          players={playersInEpisode}
          tribes={tribes}
          selectedSeason={selectedSeason}
          playersCallback={playersCallback}
          hasShotInTheDark={hasShotInTheDark}
          playerFilter='playing'
        />
        <PlayerTable
          players={playersInEpisode}
          tribes={tribes}
          selectedSeason={selectedSeason}
          playersCallback={playersCallback}
          hasShotInTheDark={hasShotInTheDark}
          playerFilter='redemption'
        />
        <PlayerTable
          players={playersInEpisode}
          tribes={tribes}
          selectedSeason={selectedSeason}
          playersCallback={playersCallback}
          hasShotInTheDark={hasShotInTheDark}
          playerFilter='edge'
        />
        <PlayerTable
          players={playersInEpisode}
          tribes={tribes}
          selectedSeason={selectedSeason}
          playersCallback={playersCallback}
          hasShotInTheDark={hasShotInTheDark}
          playerFilter='eliminated'
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
      <div className='is-clearfix'></div>
    </>
  )
}

export default PlayersInEpisode