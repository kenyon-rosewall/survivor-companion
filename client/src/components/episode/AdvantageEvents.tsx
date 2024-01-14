import React, { useState, useEffect } from "react"
import { Button, Table } from 'react-bulma-components'
import { readEpisodeAdvantageEvents, deleteAdvantageEvent } from "../../api"
import ModalForm from "../common/modalForm"
import AdvantageEventForm from "../forms/advantageEvent"
import { AdvantageEventCategoryEnum, IAdvantageEvent, IPlayerInEpisode } from "../../models"

type AdvantageEventsProps = {
  episodeId: number
  playersInEpisode: IPlayerInEpisode[]
  toggleRefreshEpisode: () => void
}

const AdvantageEvents: React.FC<AdvantageEventsProps> = ({
  episodeId, playersInEpisode, toggleRefreshEpisode
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [refreshAdvantageEvents, setRefreshAdvantageEvents] = useState<boolean>(false)
  const [advantageEvents, setAdvantageEvents] = useState<IAdvantageEvent[]>([])

  const advantageEventCallback = (data: IAdvantageEvent[]) => {
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

  const deleteAdvantageEventCallback = (data: IAdvantageEvent) => {
    setRefreshAdvantageEvents(!refreshAdvantageEvents)
    toggleRefreshEpisode()
  }

  const handleDeleteAdvantageEvent = (advantageEventId: number) => {
    deleteAdvantageEvent(advantageEventId, deleteAdvantageEventCallback)
  }

  const formatAdvantageEvent = (event: IAdvantageEvent): string => {
    switch (event.category) {
      case AdvantageEventCategoryEnum.Obtained:
        return `${event.playerInEpisode?.player?.name} obtained a ${event.advantage?.name}`
      case AdvantageEventCategoryEnum.Played:
        return `${event.playerInEpisode?.player?.name} played ${event.advantage?.name}`
      case AdvantageEventCategoryEnum.Transferred:
        return `${event.playerInEpisode?.player?.name} transferred ${event.advantage?.name}`
      case AdvantageEventCategoryEnum.Lost:
        return `${event.playerInEpisode?.player?.name} lost ${event.advantage?.name}`
      case AdvantageEventCategoryEnum.Expired:
        return `${event.playerInEpisode?.player?.name}'s ${event.advantage?.name} expired`
      default:
        return ""
    }
  }

  const renderAdvantageEvents = (): React.ReactNode => {
    return advantageEvents.map((event: IAdvantageEvent) => (
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
      <Button
        className='is-pulled-right'
        onClick={() => setIsModalOpen(true)}
      >
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
          playersInEpisode={playersInEpisode}
          callback={handleAddAdvantageEvent}
        />
      </ModalForm>
    </>
  )
}

export default AdvantageEvents