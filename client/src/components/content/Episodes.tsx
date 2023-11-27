import React from 'react'
import { Block } from 'react-bulma-components'
import EpisodeForm from '../forms/episode'
import PlayersInEpisode from './PlayersInEpisode'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
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
        <PlayersInEpisode episodeId={episodeId} />
      </Block>
    </>
  )
}

export default Episodes