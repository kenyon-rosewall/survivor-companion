import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type EventsSidebarProps = {
  seasonId: number
}

const EventsSidebar: React.FC<EventsSidebarProps> = ({ seasonId }) => {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/events`)
      .then(response => response.json())
      .then(data => {
        setEvents(data.data)
      })
      .catch(err => console.error('Error fetching events:', err))
  }, [])

  const renderEvents = () => {
    if (Array.isArray(events) && events.length > 0) {
      return events.map((event, index) => (
        <Menu.List.Item key={event.id}>
          {event.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Event</span>
      </Menu.List.Item>
      {renderEvents()}
    </>
  )
}

export default EventsSidebar