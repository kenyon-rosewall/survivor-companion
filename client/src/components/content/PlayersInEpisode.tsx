import React, { useState, useEffect } from 'react'
import { Button, Table, Tag } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'

type PlayersInEpisodeProps = {
  episodeId: number
}

const PlayersInEpisode: React.FC<PlayersInEpisodeProps> = ({ episodeId }) => {
  const [playersInEpisode, setPlayersInEpisode] = useState<any[]>([])
  const [episode, setEpisode] = useState<any>({})
  const [needsInit, setNeedsInit] = useState<boolean>(true)

  useEffect(() => {
    fetch(`http://localhost:5000/episodes/${episodeId}/players`)
    .then(response => response.json())
    .then(data => {
      setPlayersInEpisode(data.data)
      if (data.data.length > 0) {
        setNeedsInit(false)
      }
    })
    .catch(err => console.error('Error fetching players:', err))

    fetch(`http://localhost:5000/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => {
      setEpisode(data.data)
    })
    .catch(err => console.error('Error fetching episode:', err))
  }, [episodeId, needsInit])

  const renderPlayerAdvantages = (advantages: any[]) => {
    return advantages.map(advantage => (
      <Tag
        key={advantage.id}
      >
        {advantage.name}
      </Tag>
    ))
  }

  const renderPlayerAlliances = (alliances: any[]) => {
    return alliances.map(alliance => (
      <Tag
        key={alliance.id}
        color={alliance.color}
      >
        {alliance.name}
      </Tag>
    ))
  }

  const renderShotInTheDark = (shotInTheDark: boolean) => {
    let i: IconName = "square-check"
    if (shotInTheDark) i = "square"

    return (
      <FontAwesomeIcon icon={["fas", i]} />
    )
  }

  const renderPlayersInEpisode = () => {
    return playersInEpisode.map(player => (
      <tr key={player.id}>
        <td>{player.player.name}</td>
        <td>{player.tribe.name}</td>
        <td>
          <Tag.Group>
            {renderPlayerAdvantages(player.advantages)}
          </Tag.Group>
        </td>
        <td>
          <Tag.Group>
            {renderPlayerAlliances(player.alliances)}
          </Tag.Group>  
        </td>
        <td>{renderShotInTheDark(player.shotInTheDark)}</td>
        <td>{player.notes}</td>
      </tr>
    ))
  }

  const initPlayersInEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    let url = `http://localhost:5000/episodes/${episodeId}/initPlayers?premiere=${episode.premiere}`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setPlayersInEpisode(data.data)
      if (data.data.length > 0) {
        setNeedsInit(false)
      }
    })
    .catch(err => console.error('Error initializing players:', err))
  }

  return (
    <>
      <h1 className='title'>Players</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Player</th>
            <th>Tribe</th>
            <th>Advantages</th>
            <th>Alliances</th>  
            <th>Shot in the Dark</th>
            <th>Notes</th>
          </tr>  
        </thead>
        <tbody>
          {needsInit ? (
            <tr>
              <td colSpan={6}>
                No players in this episode.
                <Button
                  color='primary'
                  onClick={initPlayersInEpisode}
                >
                  Init
                </Button>
              </td>
            </tr>
          ) : (
            renderPlayersInEpisode()
          )}
        </tbody>
      </Table>      
    </>
  )
}

export default PlayersInEpisode