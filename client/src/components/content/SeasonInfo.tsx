import React, { useState, useEffect } from 'react'
import { Columns, Heading } from 'react-bulma-components'

type SeasonInfoProps = {
  seasonId: number
}

const SeasonInfo: React.FC<SeasonInfoProps> = ({ seasonId }) => {
  const [season, setSeason] = useState<any>({})
  const dateOptions: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}`)
      .then(response => response.json())
      .then(data => {
        setSeason(data.data)
      })
      .catch(err => console.error('Error fetching selected season info:', err))
  }, [seasonId])

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
            {new Date(season.filmingStart).toLocaleDateString('en-US', dateOptions)}-
            {new Date(season.filmingEnd).toLocaleDateString('en-US', dateOptions)}
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            <strong>Airing dates:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p>
            {new Date(season.airingStart).toLocaleDateString('en-US', dateOptions)}-
            {new Date(season.airingEnd).toLocaleDateString('en-US', dateOptions)}
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
        <Columns.Column size={'one-quarter'}>
          <p>
            <strong>Notes:</strong>
          </p>
        </Columns.Column>
        <Columns.Column>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {season.notes.replace(/"/g,'')}
          </p>
        </Columns.Column>
      </Columns>
    </>
  )
}

export default SeasonInfo