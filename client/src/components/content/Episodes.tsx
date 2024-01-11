import React, { useState, useEffect } from 'react'
import { Block, Tabs } from 'react-bulma-components'
import { readEpisode, readSeason, readSeasonTribes, readEpisodePlayers } from '../../api'
import EpisodeForm from '../forms/episode'
import PlayersInEpisode from '../episode/PlayersInEpisode'
import TribalCouncils from '../episode/TribalCouncils'
import Eliminations from '../episode/Eliminations'
import AdvantageEvents from '../episode/AdvantageEvents'
import Alliances from '../episode/Alliances'
import { IEpisode, ISeason, ITribe, IPlayerInEpisode } from '../../models'

type EpisodesProps = {
  seasonId: number,
  episodeId: number
}

const Episodes: React.FC<EpisodesProps> = ({ seasonId, episodeId }) => {
  const episodeTabs: string[] = [
    'Info', 'Players', 'Tribal Councils', 
    'Eliminations', 'Advantage Events', 'Alliances'
  ]
  const [selectedTab, setSelectedTab] = useState<string>('Info')
  const [episode, setEpisode] = useState<IEpisode>()
  const [season, setSeason] = useState<ISeason>()
  const [tribes, setTribes] = useState<ITribe[]>([])
  const [playersInEpisode, setPlayersInEpisode] = useState<IPlayerInEpisode[]>([])
  const [refreshEpisode, setRefreshEpisode] = useState<boolean>(false)
  const [refreshAlliances, setRefreshAlliances] = useState<boolean>(false)
  const [refreshTribalCouncils, setRefreshTribalCouncils] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return

    readEpisode(episodeId, setEpisode)
    readSeason(seasonId, setSeason)
    readSeasonTribes(seasonId, setTribes)
    readEpisodePlayers(episodeId, setPlayersInEpisode)
  }, [episodeId, seasonId, refreshEpisode])

  const toggleRefreshEpisode = () => {
    setRefreshEpisode(!refreshEpisode)
  }

  const handleFormSubmit = (episode: IEpisode) => {
    toggleRefreshEpisode()
  }

  const renderTabs = (): React.ReactNode => {
    return episodeTabs.map((tab: string, index: number) => (
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
    <Block
      className={ episodeId === 0 ? 'is-hidden' : '' }
    >
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
          playersInEpisode={playersInEpisode}
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
          refreshTribalCouncils={refreshTribalCouncils}
          setRefreshTribalCouncils={setRefreshTribalCouncils}
        />
      </Block>
      <Block
        className={selectedTab === 'Eliminations' ? '' : 'is-hidden'}
      >
        <Eliminations
          seasonId={seasonId}
          episodeId={episodeId}
          players={playersInEpisode}
          toggleRefreshEpisode={toggleRefreshEpisode}
          refreshTribalCouncils={refreshTribalCouncils}
          setRefreshTribalCouncils={setRefreshTribalCouncils}
        />
      </Block>
      <Block
        className={selectedTab === 'Advantage Events' ? '' : 'is-hidden'}
      >
        <AdvantageEvents
          episodeId={episodeId}
          players={playersInEpisode}
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
    </Block>
  )
}

export default Episodes