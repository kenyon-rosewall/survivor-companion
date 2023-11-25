import React, { useEffect, useState } from 'react'
import EpisodeForm from '../forms/episode'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = (episode: any) => {
    toggleModal()
  }

  return (
    <>
      <EpisodeForm
        formType='update'
        seasonId={seasonId}
        episodeId={episodeId}
        onSubmitComplete={handleFormSubmit}
      />
    </>
  )
}

export default Episodes