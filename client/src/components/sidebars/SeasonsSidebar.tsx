import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Modal } from 'react-bulma-components'
import { readSeasons } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedSeason } from '../../actions/seasons'
import SeasonForm from '../forms/season'

type SeasonsSidebarProps = {
  seasonId: number
}

const SeasonsSidebar: React.FC<SeasonsSidebarProps> = ({ seasonId }) => {
  const dispatch = useDispatch()
  const [seasons, setSeasons] = useState<any[]>([])
  const [maxOrder, setMaxOrder] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const findMaxOrder = (s: any[]) => {
    return Math.max.apply(Math, s.map((o: any) => { return o.order }))
  }

  const seasonsCallback = (data: any) => {
    setSeasons(data)
    setMaxOrder(findMaxOrder(data))
  }

  useEffect(() => {
    readSeasons(seasonsCallback)
  }, [seasonId])

  const renderSeasons = () => {
    if (Array.isArray(seasons) && seasons.length > 0) {
      return seasons.map((season, index) => (
        <Menu.List.Item
          key={season.id}
          active={seasonId === season.id}
          onClick={() => dispatch(setSelectedSeason(season.id))}
        >
          {season.name}
        </Menu.List.Item>
      ))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = (season: any) => {
    toggleModal()
    dispatch(setSelectedSeason(season.id))
  }

  return (
    <>
      <Menu.List.Item
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Season</span>
      </Menu.List.Item>
      {renderSeasons()}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Season</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <SeasonForm maxOrder={maxOrder} onSubmitComplete={handleFormSubmit} />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default SeasonsSidebar