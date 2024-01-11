import React, { useEffect, useState } from 'react'
import { Button, Level } from 'react-bulma-components'
import { readEpisodeTribalCouncils, createEpisodeTribalCouncil } from '../../api'
import TribalCouncilForm from '../forms/tribalCouncil'
import { ITribalCouncil, ITribe } from '../../models'

type TribalCouncilsProps = {
  episodeId: number
  tribes: ITribe[]
  refreshTribalCouncils: boolean
}

const TribalCouncils: React.FC<TribalCouncilsProps> = ({
  episodeId, tribes, refreshTribalCouncils
}) => {
  const [tribalCouncils, setTribalCouncils] = useState<ITribalCouncil[]>([])
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return
    
    readEpisodeTribalCouncils(episodeId, setTribalCouncils)
  }, [episodeId, refreshTribalCouncils])

  const addTribalCouncilCallback = (d?: any) => {
    setDisableAjax(false)
    readEpisodeTribalCouncils(episodeId, setTribalCouncils)
  }

  const addTribalCouncil = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (disableAjax === true || episodeId === 0) return
    setDisableAjax(true)

    createEpisodeTribalCouncil(episodeId, addTribalCouncilCallback)
  }

  const renderTribalCouncils = (): React.ReactNode => {
    return tribalCouncils.map((tribalCouncil: ITribalCouncil) => (
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