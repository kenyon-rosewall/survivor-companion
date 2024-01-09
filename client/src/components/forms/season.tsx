import React, { useEffect, useState } from 'react'
import { Button, Columns, Form } from 'react-bulma-components'
import { createSeason, updateSeason } from '../../api'
import DatePicker from 'react-datepicker'

type SeasonFormProps = {
  formType: string,
  season?: any,
  maxOrder: number,
  onSubmitComplete: (season: any) => void
}

const SeasonForm: React.FC<SeasonFormProps> = ({
  formType, season, maxOrder, onSubmitComplete
}) => {
  const ratings = ['', 'S', 'A', 'B', 'C', 'D', 'F']
  const [formData, setFormData] = useState<any>({
    order: maxOrder + 1,
    name: '',
    filmingStart: new Date(),
    filmingEnd: new Date(),
    airingStart: new Date(),
    airingEnd: new Date(),
    rating: '',
    whyItsGood: '',
    whyItsBad: '',
    notes: '',
    episodeCount: 0
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (season && season.id) {
      console.log('season', season)
      setFormData({
        order: season.order,
        name: season.name,
        filmingStart: new Date(season.filmingStart),
        filmingEnd: new Date(season.filmingEnd),
        airingStart: new Date(season.airingStart),
        airingEnd: new Date(season.airingEnd),
        rating: season.rating,
        whyItsGood: season.whyItsGood || '',
        whyItsBad: season.whyItsBad || '',
        notes: season.notes,
        episodeCount: season.episodeCount
      })
    }
  }, [season])

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: any) => {
    setDisableAjax(false)
    onSubmitComplete(data)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax) return
    setDisableAjax(true)

    if (formType === 'update' && season && season.id) {
      updateSeason(season.id, formData, formSubmitCallback)
    } else {
      createSeason(formData, formSubmitCallback)
    }
  }

  const renderRatings = () => {
    return ratings.map((rating, index) => (
      <option key={index} value={rating}>{rating}</option>
    ))
  }
  
  return (
    <form onSubmit={handleFormSubmit}>
      <Columns>
        <Columns.Column>
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
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>Name</Form.Label>
            <Form.Control>
              <Form.Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column size={2}>
          <Form.Field>
            <Form.Label>Rating</Form.Label>
            <Form.Control>
              <Form.Select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              >
                {renderRatings()}
              </Form.Select>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column>
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
        </Columns.Column>

        <Columns.Column>
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
        </Columns.Column>

        <Columns.Column>
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
        </Columns.Column>

        <Columns.Column>
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
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>What Makes it Good</Form.Label>
            <Form.Control>
              <Form.Textarea
                name="whyItsGood"
                value={formData.whyItsGood}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>What Makes It Bad</Form.Label>
            <Form.Control>
              <Form.Textarea
                name="whyItsBad"
                value={formData.whyItsBad}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Notes</Form.Label>
            <Form.Control>
              <Form.Textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Button
        color="primary"
        type="submit"
      >
        { formType === "update" ? "Update Season" : "Add Season" }
      </Button>
    </form>
  )
}

export default SeasonForm