import React, { useEffect, useState } from 'react'
import { Block, Tag } from 'react-bulma-components'
import Title from '../common/title'
import Subtitle from '../common/subtitle'
import AllianceForm from '../forms/alliance'
import AlliancePlayersForm from '../forms/alliancePlayers'

type AlliancesProps = {
  seasonId: number
  episodeId: number
  allianceCallback: () => void
}

const Alliances: React.FC<AlliancesProps> = ({ seasonId, episodeId, allianceCallback }) => {
  const [alliances, setAlliances] = useState<any[]>([])
  const [refreshAlliances, setRefreshAlliances] = useState<boolean>(true)

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/alliances`)
    .then(response => response.json())
    .then(data => {
      setAlliances(data.data)
    })
    .catch(err => console.error('Error fetching alliances:', err))
  }, [seasonId, episodeId, refreshAlliances])

  const renderAlliances = () => {
    return alliances.map((alliance: any, index: number) => (
      <Block key={index}>
        <Subtitle>
          <Tag
            rounded={true}
            style={{ backgroundColor: alliance.color }}
            size={'large'}
          >
            {alliance.name}
          </Tag>
        </Subtitle>
        <AlliancePlayersForm
          alliance={alliance}
          episodeId={episodeId}
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
      <Title>Alliances</Title>
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