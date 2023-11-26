import React from 'react'
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
      <EpisodeForm
        formType='update'
        seasonId={seasonId}
        episodeId={episodeId}
        onSubmitComplete={handleFormSubmit}
      />
      <PlayersInEpisode episodeId={episodeId} />
    </>
  )
}

export default Episodes