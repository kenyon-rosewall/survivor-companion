import React, { useState, useEffect } from "react"
import { Button, Modal, Table } from 'react-bulma-components'
import { readEpisodeAdvantageEvents, deleteAdvantageEvent } from "../../api"
import ModalForm from "../common/modalForm"
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

  const advantageEventCallback = (data: any) => {
    if (data.length > 0) {
      setAdvantageEvents(data)
    } else {
      setAdvantageEvents([])
    }
  }

  useEffect(() => {
    if (episodeId === 0) return

    readEpisodeAdvantageEvents(episodeId, advantageEventCallback)
  }, [episodeId, refreshAdvantageEvents])

  const handleAddAdvantageEvent = () => {
    setIsModalOpen(false)
    setRefreshAdvantageEvents(!refreshAdvantageEvents)
    toggleRefreshEpisode()
  }

  const deleteAdvantageEventCallback = (data: any) => {
    setRefreshAdvantageEvents(!refreshAdvantageEvents)
    toggleRefreshEpisode()
  }

  const handleDeleteAdvantageEvent = (advantageEventId: number) => {
    deleteAdvantageEvent(advantageEventId, deleteAdvantageEventCallback)
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
    return advantageEvents.map((event: any) => (
      <tr key={event.id}>
        <td>{formatAdvantageEvent(event)}</td>
        <td width={'40%'}>{event.notes}</td>
        <td width={2}>
          <Button
            remove
            size={'small'}
            onClick={() => handleDeleteAdvantageEvent(event.id)}
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

      <ModalForm
        title='Add Advantage Event'
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <AdvantageEventForm
          episodeId={episodeId}
          players={players}
          callback={handleAddAdvantageEvent}
        />
      </ModalForm>
    </>
  )
}

export default AdvantageEvents