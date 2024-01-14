import React, { useEffect, useState } from 'react'
import { Button, Columns, Form } from 'react-bulma-components'
import { createSeason, updateSeason } from '../../api'
import DatePicker from 'react-datepicker'
import { ISeason } from '../../models'
import { fixDate } from '../../utils'

type SeasonFormProps = {
  formType: string,
  season?: ISeason,
  maxOrder: number,
  onSubmitComplete: (season: ISeason) => void
}

const SeasonForm: React.FC<SeasonFormProps> = ({
  formType, season, maxOrder, onSubmitComplete
}) => {
  const ratings: string[] = ['', 'S', 'A', 'B', 'C', 'D', 'F']
  const [formData, setFormData] = useState<ISeason>({
    id: 0,
    order: maxOrder + 1,
    name: '',
    filmingStart: '',
    filmingEnd: '',
    airingStart: '',
    airingEnd: '',
    rating: '',
    whyItsGood: '',
    whyItsBad: '',
    notes: '',
    episodeCount: 0,
    totalDays: 0,
    hasFireTokens: false
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (season?.id) {
      setFormData({
        ...formData,
        order: season.order,
        name: season.name,
        filmingStart: season.filmingStart,
        filmingEnd: season.filmingEnd,
        airingStart: season.airingStart,
        airingEnd: season.airingEnd,
        rating: season.rating,
        whyItsGood: season.whyItsGood || '',
        whyItsBad: season.whyItsBad || '',
        notes: season.notes,
        episodeCount: season.episodeCount
      })
    }
  }, [season])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: ISeason) => {
    setDisableAjax(false)
    onSubmitComplete(data)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax) return
    setDisableAjax(true)

    if (formType === 'update' && season?.id) {
      updateSeason(season.id, formData, formSubmitCallback)
    } else {
      createSeason(formData, formSubmitCallback)
    }
  }

  const renderRatings = (): React.ReactNode => {
    return ratings.map((rating: string, index: number) => (
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
                selected={new Date(String(formData.filmingStart))}
                onChange={(date) => setFormData({ ...formData, filmingStart: fixDate(date) })}
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
                selected={new Date(String(formData.filmingEnd))}
                onChange={(date) => setFormData({ ...formData, filmingEnd: fixDate(date) })}
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
                selected={new Date(String(formData.airingStart))}
                onChange={(date) => setFormData({ ...formData, airingStart: fixDate(date) })}
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
                selected={new Date(String(formData.airingEnd))}
                onChange={(date) => setFormData({ ...formData, airingEnd: fixDate(date) })}
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