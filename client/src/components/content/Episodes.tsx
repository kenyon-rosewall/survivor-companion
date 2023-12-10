import React, { useState, useEffect } from 'react'
import { Block, Tabs } from 'react-bulma-components'
import { readEpisode, readSeason, readSeasonTribes, readEpisodePlayers, readSeasonAlliances } from '../../api'
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
  const episodeTabs = [
    'Info', 'Players', 'Tribal Councils', 
    'Eliminations', 'Advantage Events', 'Alliances'
  ]
  const [selectedTab, setSelectedTab] = useState<string>('Info')
  const [episode, setEpisode] = useState<any>({})
  const [season, setSeason] = useState<any>({})
  const [tribes, setTribes] = useState<any[]>([{}])
  const [players, setPlayers] = useState<any[]>([{}])
  const [refreshEpisode, setRefreshEpisode] = useState<boolean>(false)
  const [refreshAlliances, setRefreshAlliances] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return

    readEpisode(episodeId, setEpisode)
    readSeason(seasonId, setSeason)
    readSeasonTribes(seasonId, setTribes)
    readEpisodePlayers(episodeId, setPlayers)
  }, [episodeId, seasonId, refreshEpisode])

  const toggleRefreshEpisode = () => {
    setRefreshEpisode(!refreshEpisode)
  }

  const handleFormSubmit = (episode: any) => {
    toggleRefreshEpisode()
  }

  const renderTabs = () => {
    return episodeTabs.map((tab, index) => (
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
          season={season}
          episode={episode}
          playersInEpisode={players}
          tribes={tribes}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
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
          seasonId={seasonId}
          episodeId={episodeId}
          players={players}
          toggleRefreshEpisode={toggleRefreshEpisode}
        />
      </Block>
      <Block
        className={selectedTab === 'Advantage Events' ? '' : 'is-hidden'}
      >
        <AdvantageEvents
          episodeId={episodeId}
          players={players}
          toggleRefreshEpisode={toggleRefreshEpisode}
        />
      </Block>
      <Block
        className={selectedTab === 'Alliances' ? '' : 'is-hidden'}
      >
        <Alliances
          seasonId={seasonId}
          episodeId={episodeId}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
      </Block>
    </>
  )
}

export default Episodes