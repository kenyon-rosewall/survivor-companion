import React, { useState } from 'react'
import { Form, Button } from 'react-bulma-components'
import DatePicker from 'react-datepicker'

type SeasonFormProps = {
  maxOrder: number,
  onSubmitComplete: (season: any) => void
}

const SeasonForm: React.FC<SeasonFormProps> = ({ maxOrder, onSubmitComplete }) => {
  const ratings = ['', 'S', 'A', 'B', 'C', 'D', 'F']
  const [formData, setFormData] = useState<any>({
    order: maxOrder + 1,
    name: '',
    filmingStart: new Date(),
    filmingEnd: new Date(),
    airingStart: new Date(),
    airingEnd: new Date(),
    rating: '',
    notes: ''
  })
  const [disableButton, setDisableButton] = useState<boolean>(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableButton(true)

    fetch(`http://localhost:5000/seasons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      onSubmitComplete(data.data)
      setDisableButton(false)
    })
    .catch(err => console.error('Error adding season:', err))
  }

  const renderRatings = () => {
    return ratings.map((rating, index) => (
      <option key={index} value={rating}>{rating}</option>
    ))
  }
  
  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label>Order</Form.Label>
        <Form.Control>
          <Form.Input
            name="order"
            value={formData.order}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Name</Form.Label>
        <Form.Control>
          <Form.Input
            name="name"
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Filming Start Date</Form.Label>
        <Form.Control>
          <DatePicker
            dateFormat={'yyyy-MM-dd'}
            selected={formData.filmingStart}
            onChange={(date) => setFormData({ ...formData, filmingStart: date })}
            showIcon
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Filming End Date</Form.Label>
        <Form.Control>
          <DatePicker
            dateFormat={'yyyy-MM-dd'}
            selected={formData.filmingEnd}
            onChange={(date) => setFormData({ ...formData, filmingEnd: date })}
            showIcon
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Airing Start Date</Form.Label>
        <Form.Control>
          <DatePicker
            dateFormat={'yyyy-MM-dd'}
            selected={formData.airingStart}
            onChange={(date) => setFormData({ ...formData, airingStart: date })}
            showIcon
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Airing End Date</Form.Label>
        <Form.Control>
          <DatePicker
            dateFormat={'yyyy-MM-dd'}
            selected={formData.airingEnd}
            onChange={(date) => setFormData({ ...formData, airingEnd: date })}
            showIcon
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Rating</Form.Label>
        <Form.Control>
          <Form.Select
            name="rating"
            onChange={handleInputChange}
          >
            {renderRatings()}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Notes</Form.Label>
        <Form.Control>
          <Form.Textarea
            name="notes"
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color="primary"
        type="submit"
        disabled={disableButton}
      >
        Add Season
      </Button>
    </form>
  )
}

export default SeasonForm