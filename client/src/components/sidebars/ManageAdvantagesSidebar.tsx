import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Modal } from 'react-bulma-components'
import { setSelectedAdvantage } from '../../actions/seasons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdvantageForm from '../forms/advantage'

type ManageAdvantagesSidebarProps = {
  advantageId: number
}

const ManageAdvantagesSidebar: React.FC<ManageAdvantagesSidebarProps> = ({ advantageId }) => {
  const dispatch = useDispatch()
  const [advantages, setAdvantages] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [reloadAdvantages, setReloadAdvantages] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://localhost:5000/advantages`)
      .then(response => response.json())
      .then(data => {
        setAdvantages(data.data)
      })
      .catch(err => console.error('Error fetching advantages:', err))
  }, [reloadAdvantages])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderAdvantages = () => {
    if (Array.isArray(advantages) && advantages.length > 0) {
      return advantages.map((advantage, index) => (
        <Menu.List.Item
          key={advantage.id}
          active={advantage.id === advantageId}
          onClick={() => dispatch(setSelectedAdvantage(advantage.id))}
        >
          {advantage.name}
        </Menu.List.Item>
      ))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = () => {
    toggleModal()
    setReloadAdvantages(!reloadAdvantages)
  }

  return (
    <>
      <Menu.List.Item
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Advantage</span>
      </Menu.List.Item>
      {renderAdvantages()}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Advantage</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <AdvantageForm
              formType='create'
              onSubmitComplete={handleFormSubmit}
            />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default ManageAdvantagesSidebar