import React, { useState, useEffect } from 'react'
import { Block } from 'react-bulma-components'
import { readSeason } from '../../api'
import SeasonForm from '../forms/season'

type SeasonsProps = {
  seasonId: number
}

const Seasons: React.FC<SeasonsProps> = ({ seasonId }) => {
  const [season, setSeason] = useState<any>({})

  useEffect(() => {
    if (seasonId === 0) return

    readSeason(seasonId, setSeason)
  }, [seasonId])

  return (
    <>
      <Block className={ seasonId === 0 ? 'is-hidden' : '' }>
        <SeasonForm
          formType='update'
          season={season}
          maxOrder={season.order || 0}
          onSubmitComplete={() => {}}
        />
      </Block>
    </>
  )
}

export default Seasons