import React, { useState, useEffect } from "react"
import { Button, Form } from 'react-bulma-components'

type AdvantageEventFormProps = {
  episodeId: number
  players: any[]
  callback: () => void;
}

const AdvantageEventForm: React.FC<AdvantageEventFormProps> = ({ episodeId, players, callback }) => {
  const [advantages, setAdvantages] = useState<any[]>([])
  const categories: any[] = [
    { value: 'obtained', label: 'Obtained' },
    { value: 'played', label: 'Played' },
    { value: 'transferred', label: 'Transferred' },
    { value: 'lost', label: 'Lost' },
    { value: 'expired', label: 'Expired' },
  ]
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    playerInEpisodeId: 0,
    advantageId: 0,
    category: '',
    notes: ''
  })

  useEffect(() => {
    fetch(`http://localhost:5000/advantages`)
    .then(response => response.json())
    .then(data => {
      setAdvantages(data.data)
    })
    .catch(err => console.error('Error fetching advantages:', err))
  }, [])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisableButton(true)

    fetch(`http://localhost:5000/episodes/${episodeId}/advantageEvents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      setDisableButton(false)
      callback()
    })
    .catch(err => console.error('Error adding advantage event:', err))
  }

  return (
    <Form.Field>
      <Form.Label>Player</Form.Label>
      <Form.Control>
        <Form.Select
          name='playerInEpisodeId'
          value={formData.playerInEpisodeId}
          onChange={handleInputChange}
        >
          <option value=''>Select Player</option>
          {players.map((player: any, index: number) => (
            <option key={index} value={player.id}>{player.player?.name}</option>
          ))}
        </Form.Select>
      </Form.Control>
      <Form.Label>Advantage</Form.Label>
      <Form.Control>
        <Form.Select
          name='advantageId'
          value={formData.advantageId}
          onChange={handleInputChange}
        >
          <option value=''>Select Advantage</option>
          {advantages.map((advantage: any, index: number) => (
            <option key={index} value={advantage.id}>{advantage.name}</option>
          ))}
        </Form.Select>
      </Form.Control>
      <Form.Label>Category</Form.Label>
      <Form.Control>
        <Form.Select
          name='category'
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value=''>Select Category</option>
          {categories.map((category: any, index: number) => (
            <option key={index} value={category.value}>{category.label}</option>
          ))}
        </Form.Select>
      </Form.Control>
      <Form.Label>Notes</Form.Label>
      <Form.Control>
        <Form.Textarea
          name='notes'
          value={formData.notes}
          onChange={handleInputChange}
        />
      </Form.Control>
      <Button
        onClick={handleFormSubmit}
        disabled={disableButton}
      >
        Add Advantage Event
      </Button>
    </Form.Field>
  )
}

export default AdvantageEventForm