import React, { useEffect, useState } from 'react'
import { Block, Button, Tag } from 'react-bulma-components'
import Subtitle from '../common/subtitle'
import AllianceForm from '../forms/alliance'
import AlliancePlayersForm from '../forms/alliancePlayers'

type AlliancesProps = {
  seasonId: number
  episodeId: number
  triggerRefresh: number
  allianceCallback: () => void
}

const Alliances: React.FC<AlliancesProps> = ({ seasonId, episodeId, triggerRefresh, allianceCallback }) => {
  const [alliances, setAlliances] = useState<any[]>([])
  const [refreshAlliances, setRefreshAlliances] = useState<boolean>(true)

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/alliances`)
    .then(response => response.json())
    .then(data => {
      setAlliances(data.data)
    })
    .catch(err => console.error('Error fetching alliances:', err))
  }, [seasonId, episodeId, refreshAlliances, triggerRefresh])

  const removeAlliance = (allianceId: number) => {
    fetch(`http://localhost:5000/alliances/${allianceId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then(response => {
      setRefreshAlliances(!refreshAlliances)
      allianceCallback()
    })
    .catch(err => console.error('Error removing alliance:', err))
  }

  const renderAlliances = () => {
    return alliances.map((alliance: any, index: number) => (
      <Block key={index}>
        <Subtitle>
          <Tag
            rounded={false}
            style={{ backgroundColor: alliance.color }}
            size={'large'}
          >
            {alliance.name}
            <Button remove size={'small'} onClick={() => removeAlliance(alliance.id)} />
          </Tag>
        </Subtitle>
        <AlliancePlayersForm
          alliance={alliance}
          episodeId={episodeId}
          seasonId={seasonId}
          callback={handleAddAlliance}
        />
      </Block>
    ))
  }

  const handleAddAlliance = () => {
    setRefreshAlliances(!refreshAlliances)
    allianceCallback()
  }

  return (
    <>
      <AllianceForm
        seasonId={seasonId}
        callback={handleAddAlliance}
      />
      <br />
      {renderAlliances()}
    </>
  )
}

export default Alliances