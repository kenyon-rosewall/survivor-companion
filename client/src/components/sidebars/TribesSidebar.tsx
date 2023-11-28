import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icon, Menu, Modal } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedTribe } from '../../actions/seasons'
import TribeForm from '../forms/tribe'

type TribesSidebarProps = {
  seasonId: number,
  tribeId: number
}

const TribesSidebar: React.FC<TribesSidebarProps> = ({ seasonId, tribeId }) => {
  const dispatch = useDispatch()
  const [tribes, setTribes] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [reloadTribes, setReloadTribes] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/tribes`)
      .then(response => response.json())
      .then(data => {
        setTribes(data.data)
      })
      .catch(err => console.error('Error fetching tribes:', err))
  }, [seasonId, reloadTribes])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderTribes = () => {
    if (Array.isArray(tribes) && tribes.length > 0) {
      return tribes.map((tribe, index) => (
        <Menu.List.Item
          key={tribe.id}
          active={tribe.id === tribeId}
          onClick={() => dispatch(setSelectedTribe(tribe.id))}
        >
          {tribe.name} 
          <Icon
            className='is-pulled-right'
            size="small"
          >
            <FontAwesomeIcon icon={["fas", "circle"]} style={{ color: tribe.color }} />
          </Icon>
        </Menu.List.Item>
      ))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = () => {
    toggleModal()
    setReloadTribes(!reloadTribes)
  }

  return (
    <>
      <Menu.List.Item
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Tribe</span>
      </Menu.List.Item>
      {renderTribes()}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Tribe</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <TribeForm 
              formType="add"
              seasonId={seasonId}
              onSubmitComplete={handleFormSubmit} 
            />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default TribesSidebar