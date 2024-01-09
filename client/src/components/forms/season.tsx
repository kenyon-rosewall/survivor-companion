import React, { useState } from 'react'
import { Form, Button } from 'react-bulma-components'
import { createSeason } from '../../api'
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
    notes: '',
    episodeCount: 0
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const formSubmitCallback = (data: any) => {
    setDisableAjax(false)
    onSubmitComplete(data)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (disableAjax) return
    setDisableAjax(true)

    createSeason(formData, formSubmitCallback)
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
      >
        Add Season
      </Button>
    </form>
  )
}

export default SeasonForm