import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { readSeasonEpisodes } from '../../api'
import { setSelectedEpisode } from '../../actions/seasons'
import ModalForm from '../common/modalForm'
import EpisodeForm from '../forms/episode'

type EpisodesSidebarProps = {
  seasonId: number,
  episodeId: number
}

const EpisodesSidebar: React.FC<EpisodesSidebarProps> = ({ seasonId, episodeId }) => {
  const dispatch = useDispatch()
  const [episodes, setEpisodes] = useState<any[]>([])
  const [maxOrder, setMaxOrder] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const episodeCallback = (data: any) => {
    setEpisodes(data)
    const newMaxOrder = Math.max.apply(Math, data.map((o: any) => { return o.order }))
    setMaxOrder(newMaxOrder)
  }

  useEffect(() => {
    if (seasonId === 0) return

    readSeasonEpisodes(seasonId, episodeCallback)
  }, [seasonId])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderEpisodes = () => {
    if (!episodes) return

    return episodes.map((episode: any) => (
      <Menu.List.Item
        key={episode.id}
        active={episode.id === episodeId}
        onClick={() => dispatch(setSelectedEpisode(episode.id))}
      >
        Episode {episode.order}{episode.name !== '' ? ':' : ''} {episode.name}
      </Menu.List.Item>
    ))
  }

  const handleFormSubmit = (episode: any) => {
    setIsModalOpen(false)
    readSeasonEpisodes(seasonId, episodeCallback)
  }

  return (
    <>
      <Menu.List.Item
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon
          icon={["fas", "plus"]}
        />
        Add Episode
      </Menu.List.Item>
      {renderEpisodes()}

      <ModalForm
        title="Add Episode"
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <EpisodeForm 
          formType="add"
          seasonId={seasonId}
          maxOrder={maxOrder}
          onSubmitComplete={handleFormSubmit} 
        />
      </ModalForm>
      
    </>
  )
}

export default EpisodesSidebar