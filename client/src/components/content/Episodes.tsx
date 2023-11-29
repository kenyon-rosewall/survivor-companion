import React, { useState, useEffect } from 'react'
import { Block, Button } from 'react-bulma-components'
import EpisodeForm from '../forms/episode'
import PlayersInEpisode from './PlayersInEpisode'
import TribalCouncils from './TribalCouncils'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
  const [episode, setEpisode] = useState<any>({})
  const [tribes, setTribes] = useState<any[]>([{}])

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
  }, [episodeId, seasonId])

  const handleFormSubmit = (episode: any) => {
    // TODO: update episode in state
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
        />
      </Block>
      <Block>
        <TribalCouncils
          episodeId={episodeId}
          tribes={tribes}
        />
      </Block>
    </>
  )
}

export default Episodes