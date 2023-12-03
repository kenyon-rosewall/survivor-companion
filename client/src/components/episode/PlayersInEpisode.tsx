import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  const renderPlayersInEpisode = () => {
    return playersInEpisode.map((pie, index) => (
      <PlayerInEpisodeForm
        key={index}
        pie={pie}
        tribes={tribes}
        seasonId={selectedSeason}
        hasShotInTheDark={hasShotInTheDark}
        callback={playersCallback}
        // globalEditing={globalEditing}
      />
    ))
  }

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
      <h2 className='subtitle'>Players</h2>
      <Table bordered size='fullwidth'>
        <thead>
          <tr>
            <th>Player</th>
            <th>Status</th>
            <th>Tribe</th>
            <th>Advantages</th>
            <th>Alliances</th>
            { hasShotInTheDark ? <th>Shot in the Dark</th> : null}
            <th>Notes</th>
            <th align='center'>
              <Button 
                disabled={playersInEpisode.length === 0}
                color='primary' 
                size={'small'} 
                // onClick={() => setGlobalEditing(!globalEditing)}
              >
                <FontAwesomeIcon icon={["fas", (false ? "floppy-disk" : "edit")]} />
              </Button>
            </th>
          </tr>  
        </thead>
        <tbody>
          {renderPlayersInEpisode()}
        </tbody>
      </Table>
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