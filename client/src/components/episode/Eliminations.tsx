import React, { useState, useEffect } from 'react'
import { Button, Modal, Table } from 'react-bulma-components'
import EliminationForm from '../forms/elimination'

type EliminationsProps = {
  episodeId: number,
  players: any[]
  eliminationCallback: () => void
}

const Eliminations: React.FC<EliminationsProps> = ({ episodeId, players, eliminationCallback }) => {
  const [eliminations, setEliminations] = useState<any[]>([{}])
  const [refreshEliminations, setRefreshEliminations] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://localhost:5000/episodes/${episodeId}/eliminations`)
    .then(response => response.json())
    .then(data => {
      setEliminations(data.data)
    })
    .catch(err => console.error('Error fetching eliminations:', err))
  }, [episodeId, refreshEliminations])

  const handleAddElimination = () => {
    setIsModalOpen(false)
    setRefreshEliminations(!refreshEliminations)
    eliminationCallback()
  }

  const handleDeleteElimination = (index: number) => {
    const eliminationId = eliminations[index].id
    fetch(`http://localhost:5000/eliminations/${eliminationId}`, {
      method: 'DELETE'
    })
    .then(response => {
      setRefreshEliminations(!refreshEliminations)
      eliminationCallback()
    })
    .catch(err => console.error('Error deleting elimination:', err))
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

  const renderEliminations = () => {
    return eliminations.map((elimination: any, index: number) => (
      <tr key={index}>
        <td>{formatElimination(elimination)}</td>
        <td width={'40%'}>{elimination.notes}</td>
        <td width={2}>
          <Button
            remove
            size={'small'}
            onClick={() => handleDeleteElimination(index)}
          />
        </td>
      </tr>
    ))
  }

  return (
    <>
      <Button className='is-pulled-right' onClick={() => setIsModalOpen(true)}>
        Add Elimination
      </Button>
      <h2 className='subtitle'>Eliminations</h2>
      <Table bordered className='is-fullwidth'>
        <tbody>
          {renderEliminations()}
        </tbody>
      </Table>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Elimination</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <EliminationForm
              episodeId={episodeId}
              players={players}
              callback={handleAddElimination}
            />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default Eliminations