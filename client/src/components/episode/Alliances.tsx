import React, { useEffect, useState } from 'react'
import { Block, Button, Tag } from 'react-bulma-components'
import { readSeasonAlliances, deleteAlliance } from '../../api'
import Subtitle from '../common/subtitle'
import AllianceForm from '../forms/alliance'
import AlliancePlayersForm from '../forms/alliancePlayers'
import { IAlliance } from '../../models'

type AlliancesProps = {
  seasonId: number
  episodeId: number
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

// TODO: Add/delete ui elements instead of refreshing the component
const Alliances: React.FC<AlliancesProps> = ({ 
  seasonId, episodeId, refreshAlliances,
  toggleRefreshEpisode, setRefreshAlliances 
}) => {
  const [alliances, setAlliances] = useState<IAlliance[]>([])
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (seasonId === 0) return

    readSeasonAlliances(seasonId, setAlliances)
  }, [seasonId, refreshAlliances])

  const allianceCallback = (data?: IAlliance[]) => {
    setRefreshAlliances(!refreshAlliances)
    toggleRefreshEpisode()
    setDisableAjax(false)
  }

  const removeAlliance = (allianceId: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    deleteAlliance(allianceId, allianceCallback)
  }

  const renderAlliances = (): React.ReactNode => {
    return alliances.map((alliance: IAlliance) => (
      <Block
        key={alliance.id}
      >
        <Subtitle>
          <Tag
            rounded={false}
            style={{ backgroundColor: alliance.color }}
            size={'large'}
          >
            {alliance.name}
            <Button
              remove 
              size={'small'} 
              onClick={() => removeAlliance(alliance.id)} 
            />
          </Tag>
        </Subtitle>
        <AlliancePlayersForm
          alliance={alliance}
          episodeId={episodeId}
          seasonId={seasonId}
          allianceCallback={allianceCallback}
        />
      </Block>
    ))
  }

  return (
    <>
      <AllianceForm
        seasonId={seasonId}
        allianceCallback={allianceCallback}
      />
      <br />
      {renderAlliances()}
    </>
  )
}

export default Alliances