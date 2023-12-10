import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bulma-components'

type EliminationFormProps = {
  episodeId: number
  seasonId: number
  players: any[]
  onSubmitComplete: () => void
}

const EliminationForm: React.FC<EliminationFormProps> = ({ 
  episodeId, seasonId, players, onSubmitComplete 
}) => {
  const categories = [
    { name: 'Voted Out', value: 'votedOut' }, 
    { name: 'Rock Draw', value: 'rockDraw' }, 
    { name: 'Fire Making', value: 'fireMaking' }, 
    { name: 'Quit', value: 'quit' }, 
    { name: 'Medical Evacuation', value: 'medevac' },
    { name: 'Redemption Island', value: 'redemption' }, 
    { name: 'Edge of Extinction', value: 'edge' }, 
    { name: 'Ejected', value: 'ejection' }, 
    { name: 'Redemption Island Duel', value: 'redemptionDuel' }, 
    { name: 'Edge of Extinction Challenge', value: 'edgeChallenge' }
  ]
  const [formData, setFormData] = useState<any>({
    playerEpisodeIInd: 0,
    order: 1,
    category: 'votedOut',
    notes: ''
  })

  const updateEliminationOrder = (count: number) => {
    setFormData({ ...formData, order: count + 1 })
  }

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/eliminations/count`)
    .then(response => response.json())
    .then(data => {
      updateEliminationOrder(Number(data.data))
    })
    .catch(err => console.error('Error fetching eliminations:', err))
  }, [seasonId, updateEliminationOrder])

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    fetch(`http://localhost:5000/episodes/${episodeId}/eliminations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      onSubmitComplete()
    })
    .catch(err => console.error('Error adding elimination:', err))
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
            {players.map((player: any) => (
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