import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bulma-components'
import { readEpisodeEliminations, deleteElimination } from '../../api'
import ModalForm from '../common/modalForm'
import EliminationForm from '../forms/elimination'
import { EliminationCategoryEnum, IElimination, IPlayerInEpisode } from '../../models'

type EliminationsProps = {
  episodeId: number
  seasonId: number
  playersInEpisode: IPlayerInEpisode[]
  toggleRefreshEpisode: () => void
  refreshTribalCouncils: boolean
  setRefreshTribalCouncils: (refresh: boolean) => void
}

const Eliminations: React.FC<EliminationsProps> = ({ 
  episodeId, seasonId, playersInEpisode, toggleRefreshEpisode,
  refreshTribalCouncils, setRefreshTribalCouncils
}) => {
  const [eliminations, setEliminations] = useState<IElimination[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (episodeId === 0) return

    readEpisodeEliminations(episodeId, setEliminations)
  }, [episodeId])

  const eliminationCallback = () => {
    setIsModalOpen(false)
    readEpisodeEliminations(episodeId, setEliminations)
    setRefreshTribalCouncils(!refreshTribalCouncils)
    toggleRefreshEpisode()
  }

  const onSubmitComplete = (data?: IElimination[]) => {
    eliminationCallback()
  }

  const handleDeleteElimination = (eliminationId: number) => {
    deleteElimination(eliminationId, onSubmitComplete)
    eliminationCallback()
  }

  const formatElimination = (elimination: IElimination) => {
    switch (elimination.category) {
      case EliminationCategoryEnum.VotedOut:
        return `${elimination.playerInEpisode?.player?.name} was voted out`
      case EliminationCategoryEnum.RockDraw:
        return `${elimination.playerInEpisode?.player?.name} was eliminated by a rock draw`
      case EliminationCategoryEnum.FireMaking:
        return `${elimination.playerInEpisode?.player?.name} lost a fire-making challenge`
      case EliminationCategoryEnum.Quit:
        return `${elimination.playerInEpisode?.player?.name} quit`
      case EliminationCategoryEnum.Medevac:
        return `${elimination.playerInEpisode?.player?.name} was medically evacuated`
      case EliminationCategoryEnum.Redemption:
        return `${elimination.playerInEpisode?.player?.name} was sent to Redemption Island`
      case EliminationCategoryEnum.Edge:
        return `${elimination.playerInEpisode?.player?.name} was sent to the Edge of Extinction`
      case EliminationCategoryEnum.Ejection:
        return `${elimination.playerInEpisode?.player?.name} was ejected`
      case EliminationCategoryEnum.RedemptionDuel:
        return `${elimination.playerInEpisode?.player?.name} lost a Redemption Island duel`
      case EliminationCategoryEnum.EdgeChallenge:
        return `${elimination.playerInEpisode?.player?.name} lost an Edge of Extinction challenge`
      default:
        return ""
    }
  }

  const ordinalSuffix = (i: number): string => {
    const j: number = i % 10
    const k: number = i % 100

    if (j === 1 && k !== 11) {
        return i + "st"
    }

    if (j === 2 && k !== 12) {
        return i + "nd"
    }

    if (j === 3 && k !== 13) {
        return i + "rd";
    }

    return i + "th";
  }

  const renderEliminations = (): React.ReactNode => {
    return (
      <tbody>
        {eliminations.map((elimination: IElimination) => (
          <tr
            key={elimination.id}
          >
            <td>
              {ordinalSuffix(elimination.order)}
            </td>
            <td>
              {formatElimination(elimination)}
            </td>
            <td 
              width={'40%'}
            >
              {elimination.notes}
            </td>
            <td
              width={2}
            >
              <Button
                remove
                size={'small'}
                onClick={() => handleDeleteElimination(elimination.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <>
      <Button 
        className='is-pulled-right' 
        onClick={() => setIsModalOpen(true)}
      >
        Add Elimination
      </Button>
      
      <br /><br />

      <Table 
        bordered 
        className='is-fullwidth'
      >
        {renderEliminations()}
      </Table>

      <ModalForm 
        title='Add Elimination'
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <EliminationForm
          episodeId={episodeId}
          seasonId={seasonId}
          playersInEpisode={playersInEpisode}
          onSubmitComplete={onSubmitComplete}
        />
      </ModalForm>
      
    </>
  )
}

export default Eliminations