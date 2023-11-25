import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedPlayer } from '../../actions/seasons'
import PlayerForm from '../forms/player'

type PlayersSidebarProps = {
  seasonId: number,
  playerId: number
}

const PlayersSidebar: React.FC<PlayersSidebarProps> = ({ seasonId, playerId }) => {
  const dispatch = useDispatch()
  const [players, setPlayers] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [reloadPlayers, setReloadPlayers] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/players`)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.data)
      })
      .catch(err => console.error('Error fetching players:', err))
  }, [seasonId, reloadPlayers])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player, index) => (
        <Menu.List.Item
          key={player.playerId}
          active={player.playerId === playerId}
          onClick={() => dispatch(setSelectedPlayer(player.playerId))}
        >
          {player.player.name} {player.player.nickname ? `(${player.player.nickname})` : ''}
        </Menu.List.Item>
      ))
    }
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFormSubmit = () => {
    toggleModal()
    setReloadPlayers(!reloadPlayers)
  }

  return (
    <>
      <Menu.List.Item
        onClick={toggleModal}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Player</span>
      </Menu.List.Item>
      {renderPlayers()}
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Player</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <PlayerForm 
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

export default PlayersSidebar