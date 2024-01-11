import React, { useState, useEffect } from 'react'
import { Columns, Heading } from 'react-bulma-components'
import { readSeason } from '../../api'
import { ISeason } from '../../models'
import { fixDate } from '../../utils'

type SeasonInfoProps = {
  seasonId: number
}

const SeasonInfo: React.FC<SeasonInfoProps> = ({ seasonId }) => {
  const [season, setSeason] = useState<ISeason>()

  useEffect(() => {
    readSeason(seasonId, setSeason)
  }, [seasonId])

  if (!season) return null

  return (
    <>
      <Columns>
        <Columns.Column>
          <Heading>
            Season {season.order}
          </Heading>
          <Heading subtitle>
            {season.name}
          </Heading>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column>
          <p>
            <strong>Filming dates:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            {fixDate(season.filmingStart)} - {fixDate(season.filmingEnd)}
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            <strong>Airing dates:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            {fixDate(season.airingStart)} - {fixDate(season.airingEnd)}
          </p>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column>
          <p>
            <strong>Episode count:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            {season.episodeCount}
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            <strong>Rating:</strong>
          </p>  
        </Columns.Column>
        <Columns.Column>
          <p>
            {season.rating}
          </p>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column>
          <p><strong>What Makes it Good:</strong></p>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {(season.whyItsGood) ? season.whyItsGood : ''}
          </p>
        </Columns.Column>
        <Columns.Column>
          <p><strong>What Makes it Bad</strong></p>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {(season.whyItsBad) ? season.whyItsBad : ''}
          </p>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column size={'one-quarter'}>
          <p>
            <strong>Notes:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {String(season.notes).replace(/"/g,'')}
          </p>
        </Columns.Column>
      </Columns>
    </>
  )
}

export default SeasonInfo