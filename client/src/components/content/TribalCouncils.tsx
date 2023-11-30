import React, { useEffect, useState } from 'react'
import { Button } from 'react-bulma-components'
import TribalCouncilForm from '../forms/tribalCouncil'

type TribalCouncilsProps = {
  episodeId: number
  tribes: any[]
}

const TribalCouncils: React.FC<TribalCouncilsProps> = ({ episodeId, tribes }) => {
  const [tribalCouncils, setTribalCouncils] = useState([])
  const [refreshTribalCouncils, setRefreshTribalCouncils] = useState(false)
  const [disableAddButton, setDisableAddButton] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:5000/episodes/${episodeId}/tribalCouncils`)
    .then(response => response.json())
    .then(data => {
      setTribalCouncils(data.data)
    })
    .catch(err => console.log('Error fetching tribal councils:', err))
  }, [episodeId, refreshTribalCouncils])

  const addTribalCouncil = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisableAddButton(true)
    
    fetch(`http://localhost:5000/episodes/${episodeId}/tribalCouncils`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'episodeId': episodeId })
    })
    .then(response => response.json())
    .then(data => {
      setRefreshTribalCouncils(!refreshTribalCouncils)
    })
    .catch(err => console.log('Error adding tribal council:', err))
  }

  const renderTribalCouncils = () => {
    return tribalCouncils.map((tribalCouncil: any, index: number) => (
      <TribalCouncilForm
        key={index}
        tribalCouncilId={tribalCouncil.id}
        tribes={tribes}
      />
    ))
  }

  return (
    <>
      <Button
        className="is-pulled-right"
        onClick={addTribalCouncil}
        disabled={disableAddButton}
      >Add Tribal Council</Button>
      <h2 className='subtitle'>Tribal Council</h2>
      {renderTribalCouncils()}
    </>
  )
}

export default TribalCouncils