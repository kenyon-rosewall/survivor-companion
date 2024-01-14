import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form } from 'react-bulma-components'
import { readSeasonEliminationCount, createEpisodeElimination } from '../../api'
import { EliminationCategoryEnum, IElimination, IPlayerInEpisode } from '../../models'

type EliminationFormProps = {
  episodeId: number
  seasonId: number
  playersInEpisode: IPlayerInEpisode[]
  onSubmitComplete: () => void
}

type EliminationCategory = {
  label: string
  value: EliminationCategoryEnum
}

const EliminationForm: React.FC<EliminationFormProps> = ({ 
  episodeId, seasonId, playersInEpisode, onSubmitComplete 
}) => {
  const categories: EliminationCategory[] = [
    { label: 'Voted Out', value: EliminationCategoryEnum.VotedOut }, 
    { label: 'Rock Draw', value: EliminationCategoryEnum.RockDraw },
    { label: 'Fire Making', value: EliminationCategoryEnum.FireMaking }, 
    { label: 'Quit', value: EliminationCategoryEnum.Quit }, 
    { label: 'Medical Evacuation', value: EliminationCategoryEnum.Medevac },
    { label: 'Redemption Island', value: EliminationCategoryEnum.Redemption }, 
    { label: 'Edge of Extinction', value: EliminationCategoryEnum.Edge }, 
    { label: 'Ejected', value: EliminationCategoryEnum.Ejection }, 
    { label: 'Redemption Island Duel', value: EliminationCategoryEnum.RedemptionDuel }, 
    { label: 'Edge of Extinction Challenge', value: EliminationCategoryEnum.EdgeChallenge }
  ]
  const [formData, setFormData] = useState<IElimination>({
    id: 0,
    playerInEpisodeId: 0,
    order: 1,
    category: EliminationCategoryEnum.VotedOut,
    notes: ''
  })

  const updateEliminationOrder = useCallback((count: string) => {
    setFormData({ ...formData, order: Number(count) + 1 })
  }, [formData])

  useEffect(() => {
    if (seasonId === 0) return
    
    readSeasonEliminationCount(seasonId, updateEliminationOrder)
  }, [seasonId, updateEliminationOrder])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: IElimination) => {
    onSubmitComplete()
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createEpisodeElimination(episodeId, formData, formSubmitCallback)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label>Order</Form.Label>
        <Form.Control>
          <Form.Input
            name='order'
            value={formData.order}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Player</Form.Label>
        <Form.Control>
          <Form.Select
            name='playerInEpisodeId'
            value={formData.playerInEpisodeId}
            onChange={handleInputChange}
          >
            <option value={0}>Select a player</option>
            {playersInEpisode.map((player: any) => (
              <option key={player.id} value={player.id}>{player.player?.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Category</Form.Label>
        <Form.Control>
          <Form.Select
            name='category'
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((category: any, index: number) => (
              <option key={index} value={category.value}>{category.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Notes</Form.Label>
        <Form.Control>
          <Form.Textarea
            name='notes'
            value={formData.notes}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color={'primary'}
      >
        Add Elimination
      </Button>
    </form>
  )
}

export default EliminationForm