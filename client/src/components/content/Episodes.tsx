import React, { useState, useEffect } from 'react'
import { Block, Button } from 'react-bulma-components'
import EpisodeForm from '../forms/episode'
import PlayersInEpisode from './PlayersInEpisode'
import TribalCouncils from './TribalCouncils'
import Eliminations from './Eliminations'
import AdvantageEvents from './AdvantageEvents'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
  const [episode, setEpisode] = useState<any>({})
  const [tribes, setTribes] = useState<any[]>([{}])
  const [players, setPlayers] = useState<any[]>([{}])
  const [refreshPlayersInEpisode, setRefreshPlayersInEpisode] = useState<number>(0)

  useEffect(() => {
    fetch(`http://localhost:5000/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => {
      setEpisode(data.data)
    })
    .catch(err => console.error('Error fetching episode:', err))

    fetch(`http://localhost:5000/seasons/${seasonId}/tribes`)
    .then(response => response.json())
    .then(data => {
      setTribes(data.data)
    })
    .catch(err => console.error('Error fetching tribes:', err))

    fetch(`http://localhost:5000/episodes/${episodeId}/players`)
    .then(response => response.json())
    .then(data => {
      setPlayers(data.data)
    })
    .catch(err => console.error('Error fetching playing players:', err))
  }, [episodeId, seasonId])

  const handleFormSubmit = (episode: any) => {
    // TODO: update episode in state
  }

  const incrementRefreshPlayersInEpisode = () => {
    setRefreshPlayersInEpisode(refreshPlayersInEpisode + 1)
  }

  return (
    <>
      <Block>
        <h2 className='subtitle'>Info</h2>
        <EpisodeForm
          formType='update'
          seasonId={seasonId}
          episodeId={episodeId}
          onSubmitComplete={handleFormSubmit}
        />
      </Block>
      <Block>
        <PlayersInEpisode
          episodeId={episodeId}
          episode={episode}
          tribes={tribes}
          refreshPlayersInEpisode={refreshPlayersInEpisode}
        />
      </Block>
      <Block>
        <TribalCouncils
          episodeId={episodeId}
          tribes={tribes}
        />
      </Block>
      <Block>
        <Eliminations
          episodeId={episodeId}
          players={players}
          eliminationCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
      <Block>
        <AdvantageEvents
          episodeId={episodeId}
          players={players}
          advantageEventCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
    </>
  )
}

export default Episodes