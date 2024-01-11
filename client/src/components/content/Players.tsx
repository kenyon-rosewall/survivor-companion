import React, { useState, useEffect } from 'react'
import { Block, Tabs } from 'react-bulma-components'
import { readSeasonPlayer } from '../../api'
import Stats from '../player/Stats'
import Timeline from '../player/Timeline'
import PlayerForm from '../forms/player'
import { IPlayerOnSeason } from '../../models'

type PlayersProps = {
  seasonId: number,
  playerId: number
}

const Players: React.FC<PlayersProps> = ({ 
  seasonId, playerId 
}) => {
  const tabs: string[] = ['Info', 'Stats', 'Timeline']
  const [playerOnSeason, setPlayerOnSeason] = useState<IPlayerOnSeason>()
  const [selectedTab, setSelectedTab] = useState<string>('Info')

  useEffect(() => {
    if (playerId === 0) return

    readSeasonPlayer(seasonId, playerId, setPlayerOnSeason)
  }, [playerId, seasonId])

  const handleFormSubmit = (player: IPlayerOnSeason) => {
    // TODO: update player in state
  }

  const renderTabs = (): React.ReactNode => {
    return tabs.map((tab: string, index: number) => (
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
      className={ playerId === 0 ? 'is-hidden' : '' }
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
        <PlayerForm
          formType='update'
          seasonId={seasonId}
          playerOnSeason={playerOnSeason}
          onSubmitComplete={handleFormSubmit}
        />
      </Block>

      <Block
        className={selectedTab === 'Stats' ? '' : 'is-hidden'}
      >
        <Stats playerOnSeason={playerOnSeason} />
      </Block>

      <Block
        className={selectedTab === 'Timeline' ? '' : 'is-hidden'}
      >
        <Timeline playerOnSeason={playerOnSeason} />
      </Block>

    </Block>
  )
}

export default Players