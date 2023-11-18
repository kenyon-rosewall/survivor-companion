import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type EpisodesSidebarProps = {
  seasonId: number
}

const EpisodesSidebar: React.FC<EpisodesSidebarProps> = ({ seasonId }) => {
  const [episodes, setEpisodes] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/episodes`)
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.data)
      })
      .catch(err => console.error('Error fetching episodes:', err))
  }, [])

  const renderEpisodes = () => {
    if (Array.isArray(episodes) && episodes.length > 0) {
      return episodes.map((episode, index) => (
        <Menu.List.Item key={episode.id}>
          Episode {episode.order}{episode.name !== '' ? ':' : ''} {episode.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Episode</span>
      </Menu.List.Item>
      {renderEpisodes()}
    </>
  )
}

export default EpisodesSidebar