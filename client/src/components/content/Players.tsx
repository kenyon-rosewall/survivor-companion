import React, { useState, useEffect } from 'react'
import { Block, Tabs } from 'react-bulma-components'
import { readSeasonPlayer } from '../../api'
import Stats from '../player/stats'
import PlayerForm from '../forms/player'

type PlayersProps = {
  seasonId: number,
  playerId: number
}

const Players: React.FC<PlayersProps> = ({ 
  seasonId, playerId 
}) => {
  const tabs = ['Info', 'Stats', 'Timeline']
  const [player, setPlayer] = useState<any>({})
  const [selectedTab, setSelectedTab] = useState<string>('Info')

  useEffect(() => {
    if (playerId === 0) return

    readSeasonPlayer(seasonId, playerId, setPlayer)
  }, [playerId, seasonId])

  const handleFormSubmit = (player: any) => {
    // TODO: update player in state
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
          playerOnSeason={player}
          onSubmitComplete={handleFormSubmit}
        />
      </Block>

      <Block
        className={selectedTab === 'Stats' ? '' : 'is-hidden'}
      >
        <Stats player={player} />
      </Block>

      <Block
        className={selectedTab === 'Timeline' ? '' : 'is-hidden'}
      >
        <p>Timeline</p>
      </Block>

    </Block>
  )
}

export default Players