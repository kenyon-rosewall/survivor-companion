import React, { useState, useEffect } from "react"
import { Button, Modal, Table } from 'react-bulma-components'
import AdvantageEventForm from "../forms/advantageEvent"

type AdvantageEventsProps = {
  episodeId: number
  players: any[]
  toggleRefreshEpisode: () => void
}

const AdvantageEvents: React.FC<AdvantageEventsProps> = ({ episodeId, players, toggleRefreshEpisode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [refreshAdvantageEvents, setRefreshAdvantageEvents] = useState<boolean>(false)
  const [advantageEvents, setAdvantageEvents] = useState<any[]>([])

  useEffect(() => {
    if (episodeId === 0) return

    fetch(`http://localhost:5000/episodes/${episodeId}/advantageEvents`)
    .then(response => response.json())
    .then(data => {
      const ae: any[] = data.data.length > 0 ? data.data : []
      setAdvantageEvents(ae)
    })
    .catch(err => console.error('Error fetching advantage events:', err))
  }, [episodeId, refreshAdvantageEvents])

  const handleAddAdvantageEvent = () => {
    setIsModalOpen(false)
    setRefreshAdvantageEvents(!refreshAdvantageEvents)
    toggleRefreshEpisode()
  }

  const handleDeleteAdvantageEvent = (index: number) => {
    const advantageEventId = advantageEvents[index].id
    fetch(`http://localhost:5000/advantageEvents/${advantageEventId}`, {
      method: 'DELETE'
    })
    .then(response => {
      setRefreshAdvantageEvents(!refreshAdvantageEvents)
      toggleRefreshEpisode()
    })
    .catch(err => console.error('Error deleting advantage event:', err))
  }

  const formatAdvantageEvent = (event: any) => {
    switch (event.category) {
      case 'obtained':
        return `${event.playerInEpisode.player?.name} obtained a ${event.advantage?.name}`
      case 'played':
        return `${event.playerInEpisode.player?.name} played ${event.advantage?.name}`
      case 'transferred':
        return `${event.playerInEpisode.player?.name} transferred ${event.advantage?.name}`
      case 'lost':
        return `${event.playerInEpisode.player?.name} lost ${event.advantage?.name}`
      case 'expired':
        return `${event.playerInEpisode.player?.name}'s ${event.advantage?.name} expired`
      default:
        return ''
    }
  }

  const renderAdvantageEvents = () => {
    return advantageEvents.map((event: any, index: number) => (
      <tr key={index}>
        <td>{formatAdvantageEvent(event)}</td>
        <td width={'40%'}>{event.notes}</td>
        <td width={2}>
          <Button
            remove
            size={'small'}
            onClick={() => handleDeleteAdvantageEvent(index)}
          />
        </td>
      </tr>
    ))
  }

  return (
    <>
      <Button className='is-pulled-right' onClick={() => setIsModalOpen(true)}>
        Add Advantage Event
      </Button>
      <br /><br />
      <Table bordered className='is-fullwidth'>
        <tbody>
          {renderAdvantageEvents()}
        </tbody>
      </Table>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>Add Advantage Event</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <AdvantageEventForm
              episodeId={episodeId}
              players={players}
              callback={handleAddAdvantageEvent}
            />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </>
  )
}

export default AdvantageEvents