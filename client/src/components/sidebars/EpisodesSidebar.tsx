import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Modal } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedEpisode } from '../../actions/seasons'
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
  const [reloadEpisodes, setReloadEpisodes] = useState<boolean>(false)

  const findMaxOrder = (e: any[]) => {
    return Math.max.apply(Math, e.map((o: any) => { return o.order }))
  }

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/episodes`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.data)
        if (data.data.length > 0) {
          setMaxOrder(findMaxOrder(data.data))
        }
      })
      .catch(err => console.error('Error fetching episodes:', err))
  }, [seasonId, reloadEpisodes])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderEpisodes = () => {
    if (Array.isArray(episodes) && episodes.length > 0) {
      return episodes.map((episode, index) => (
        <Menu.List.Item
          key={episode.id}
          active={episode.id === episodeId}
          onClick={() => dispatch(setSelectedEpisode(episode.id))}
        >
          Episode {episode.order}{episode.name !== '' ? ':' : ''} {episode.name}
        </Menu.List.Item>
      ))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = (episode: any) => {
    toggleModal()
    setReloadEpisodes(!reloadEpisodes)
  }

  return (
    <>
      <Menu.List.Item
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Episode</span>
      </Menu.List.Item>
      {renderEpisodes()}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Episode</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <EpisodeForm 
              formType="add"
              seasonId={seasonId}
              maxOrder={maxOrder}
              onSubmitComplete={handleFormSubmit} 
            />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default EpisodesSidebar