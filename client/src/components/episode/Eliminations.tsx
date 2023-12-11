import React, { useState, useEffect } from 'react'
import { Button, Modal, Table } from 'react-bulma-components'
import { readEpisodeEliminations, deleteElimination } from '../../api'
import ModalForm from '../common/modalForm'
import EliminationForm from '../forms/elimination'

type EliminationsProps = {
  episodeId: number,
  seasonId: number,
  players: any[]
  toggleRefreshEpisode: () => void
}

const Eliminations: React.FC<EliminationsProps> = ({ 
  episodeId, seasonId, players, toggleRefreshEpisode
}) => {
  const [eliminations, setEliminations] = useState<any[]>([{}])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return

    readEpisodeEliminations(episodeId, setEliminations)
  }, [episodeId])

  const onSubmitComplete = (d?: any) => {
    setIsModalOpen(false)
    readEpisodeEliminations(episodeId, setEliminations)
    toggleRefreshEpisode()
  }

  const handleDeleteElimination = (eliminationId: number) => {
    deleteElimination(eliminationId, onSubmitComplete)
  }

  const formatElimination = (elimination: any) => {
    switch (elimination.category) {
      case 'votedOut':
        return `${elimination.playerInEpisode.player?.name} was voted out`
      case 'rockDraw':
        return `${elimination.playerInEpisode.player?.name} was eliminated by a rock draw`
      case 'fireMaking':
        return `${elimination.playerInEpisode.player?.name} lost a fire-making challenge`
      case 'quit':
        return `${elimination.playerInEpisode.player?.name} quit`
      case 'medevac':
        return `${elimination.playerInEpisode.player?.name} was medically evacuated`
      case 'redemption':
        return `${elimination.playerInEpisode.player?.name} was sent to Redemption Island`
      case 'edge':
        return `${elimination.playerInEpisode.player?.name} was sent to the Edge of Extinction`
      case 'ejection':
        return `${elimination.playerInEpisode.player?.name} was ejected`
      case 'redemptionDuel':
        return `${elimination.playerInEpisode.player?.name} lost a Redemption Island duel`
      case 'edgeChallenge':
        return `${elimination.playerInEpisode.player?.name} lost an Edge of Extinction challenge`
    }
  }

  const ordinalSuffix = (i: number) => {
    const j = i % 10
    const k = i % 100

    if (j === 1 && k !== 11) {
        return i + "st"
    }

    if (j === 2 && k !== 12) {
        return i + "nd"
    }

    if (j === 3 && k !== 13) {
        return i + "rd";
    }

    return i + "th";
  }

  const renderEliminations = () => {
    return (
      <tbody>
        {eliminations.map((elimination: any) => (
          <tr
            key={elimination.id}
          >
            <td>
              {ordinalSuffix(elimination.order)}
            </td>
            <td>
              {formatElimination(elimination)}
            </td>
            <td 
              width={'40%'}
            >
              {elimination.notes}
            </td>
            <td
              width={2}
            >
              <Button
                remove
                size={'small'}
                onClick={() => handleDeleteElimination(elimination.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <>
      <Button 
        className='is-pulled-right' 
        onClick={() => setIsModalOpen(true)}
      >
        Add Elimination
      </Button>
      
      <br /><br />

      <Table 
        bordered 
        className='is-fullwidth'
      >
        {renderEliminations()}
      </Table>

      <ModalForm 
        title='Add Elimination'
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <EliminationForm
          episodeId={episodeId}
          seasonId={seasonId}
          players={players}
          onSubmitComplete={onSubmitComplete}
        />
      </ModalForm>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Elimination</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default Eliminations