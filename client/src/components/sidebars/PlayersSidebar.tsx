import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { readSeasonPlayers } from '../../api'
import { setSelectedPlayer } from '../../actions/seasons'
import ModalForm from '../common/modalForm'
import PlayerForm from '../forms/player'
import { IPlayerOnSeason } from '../../models'

type PlayersSidebarProps = {
  seasonId: number,
  playerId: number
}

const PlayersSidebar: React.FC<PlayersSidebarProps> = ({ 
  seasonId, playerId 
}) => {
  const dispatch = useDispatch()
  const [playersOnSeason, setPlayersOnSeason] = useState<IPlayerOnSeason[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (seasonId === 0) return

    readSeasonPlayers(seasonId, setPlayersOnSeason)
  }, [seasonId])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) modalEl.scrollTop = 0
    }
  }, [isModalOpen])

  const renderPlayers = (): React.ReactNode => {
    if (!playersOnSeason) return

    return playersOnSeason.map((playerOnSeason: IPlayerOnSeason) => (
      <Menu.List.Item
        key={playerOnSeason.playerId}
        active={playerOnSeason.playerId === playerId}
        onClick={() => dispatch(setSelectedPlayer(playerOnSeason.playerId))}
      >
        {playerOnSeason.player?.name} 
        {playerOnSeason.player?.nickname ? `(${playerOnSeason.player?.nickname})` : ''}
      </Menu.List.Item>
    ))
  }

  const handleFormSubmit = () => {
    setIsModalOpen(false)
    readSeasonPlayers(seasonId, setPlayersOnSeason)
  }

  return (
    <>
      <Menu.List.Item
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon 
          icon={["fas", "plus"]} 
        /> 
        Add Player
      </Menu.List.Item>
      {renderPlayers()}

      <ModalForm
        title="Add Player"
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <PlayerForm 
          formType="add"
          seasonId={seasonId}
          onSubmitComplete={handleFormSubmit} 
        />
      </ModalForm>

    </>
  )
}

export default PlayersSidebar