import React, { useState, useEffect } from 'react'
import { Block, Tabs } from 'react-bulma-components'
import EpisodeForm from '../forms/episode'
import PlayersInEpisode from '../episode/PlayersInEpisode'
import TribalCouncils from '../episode/TribalCouncils'
import Eliminations from '../episode/Eliminations'
import AdvantageEvents from '../episode/AdvantageEvents'
import Alliances from '../episode/Alliances'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
  const [episode, setEpisode] = useState<any>({})
  const [tribes, setTribes] = useState<any[]>([{}])
  const [players, setPlayers] = useState<any[]>([{}])
  const [refreshPlayersInEpisode, setRefreshPlayersInEpisode] = useState<number>(0)
  const tabs = [
    'Info', 'Players', 'Tribal Councils', 'Eliminations', 'Advantage Events', 'Alliances'
  ]
  const [selectedTab, setSelectedTab] = useState<string>('Info')

  useEffect(() => {
    if (episodeId === 0) return

    fetch(`http://localhost:5000/episodes/${episodeId}`)
    .then(response => response.json())
    .then(data => {
      setEpisode(data.data)
    })
    .catch(err => console.error('Error fetching episode:', err))

    fetch(`http://localhost:5000/seasons/${seasonId}/tribes`)
    .then(response => response.json())
    .then(data => {
      setTribes(data.data)
    })
    .catch(err => console.error('Error fetching tribes:', err))

    fetch(`http://localhost:5000/episodes/${episodeId}/players`)
    .then(response => response.json())
    .then(data => {
      setPlayers(data.data)
    })
    .catch(err => console.error('Error fetching playing players:', err))
  }, [episodeId, seasonId])

  const handleFormSubmit = (episode: any) => {
    // TODO: update episode in state
  }

  const incrementRefreshPlayersInEpisode = () => {
    setRefreshPlayersInEpisode(refreshPlayersInEpisode + 1)
  }

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <Tabs.Tab
        key={index}
        active={tab === selectedTab}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </Tabs.Tab>
    ))
  }

  return (
    <>
      <Tabs 
        align='center'
        fullwidth={true}
        type='boxed'
      >
        {renderTabs()}
      </Tabs>
      <Block
        className={selectedTab === 'Info' ? '' : 'is-hidden'}
      >
        <h2 className='subtitle'>Info</h2>
        <EpisodeForm
          formType='update'
          seasonId={seasonId}
          episodeId={episodeId}
          onSubmitComplete={handleFormSubmit}
        />
      </Block>
      <Block
        className={selectedTab === 'Players' ? '' : 'is-hidden'}
      >
        <PlayersInEpisode
          episodeId={episodeId}
          episode={episode}
          tribes={tribes}
          refreshPlayersInEpisode={refreshPlayersInEpisode}
          playersCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
      <Block
        className={selectedTab === 'Tribal Councils' ? '' : 'is-hidden'}
      >
        <TribalCouncils
          episodeId={episodeId}
          tribes={tribes}
        />
      </Block>
      <Block
        className={selectedTab === 'Eliminations' ? '' : 'is-hidden'}
      >
        <Eliminations
          episodeId={episodeId}
          players={players}
          eliminationCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
      <Block
        className={selectedTab === 'Advantage Events' ? '' : 'is-hidden'}
      >
        <AdvantageEvents
          episodeId={episodeId}
          players={players}
          advantageEventCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
      <Block
        className={selectedTab === 'Alliances' ? '' : 'is-hidden'}
      >
        <Alliances
          seasonId={seasonId}
          episodeId={episodeId}
          allianceCallback={incrementRefreshPlayersInEpisode}
        />
      </Block>
    </>
  )
}

export default Episodes