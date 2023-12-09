import React, { useEffect, useState } from 'react'
import { Button, Level } from 'react-bulma-components'
import { getTribalCouncilsInEpisode, createTribalCouncil } from '../../api'
import TribalCouncilForm from '../forms/tribalCouncil'

type TribalCouncilsProps = {
  episodeId: number
  tribes: any[]
}

const TribalCouncils: React.FC<TribalCouncilsProps> = ({
  episodeId, tribes 
}) => {
  const [tribalCouncils, setTribalCouncils] = useState<any[]>([])
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return
    
    getTribalCouncilsInEpisode(episodeId, setTribalCouncils)
  }, [episodeId, getTribalCouncilsInEpisode])

  const addTribalCouncil = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)

    const addTribalCouncilCallback = () => {
      setDisableAjax(false)
      getTribalCouncilsInEpisode(episodeId, setTribalCouncils)
    }
    
    createTribalCouncil(episodeId, addTribalCouncilCallback)
  }

  const renderTribalCouncils = () => {
    return tribalCouncils.map((tribalCouncil: any) => (
      <TribalCouncilForm
        key={tribalCouncil.id}
        tribalCouncilId={tribalCouncil.id}
        tribes={tribes}
      />
    ))
  }

  return (
    <>
      <Level>
        <Level.Side align="left" />
        <Level.Side align="right">
          <Level.Item>
            <Button
              onClick={addTribalCouncil}
              disabled={disableAjax}
            >
              Add Tribal Council
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>

      {renderTribalCouncils()}
    </>
  )
}

export default TribalCouncils