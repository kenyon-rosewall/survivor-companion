import React, { useEffect, useState } from 'react'
import { Columns, Form, Button } from 'react-bulma-components'
import { readEpisode, createSeasonEpisode, updateEpisode } from '../../api'
import DatePicker from 'react-datepicker'
import { fixDate } from '../../utils'
import { IEpisode } from '../../models'

type EpisodeFormProps = {
  formType: string,
  seasonId: number,
  episodeId?: number,
  maxOrder?: number,
  onSubmitComplete: (episode: any) => void
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({
  formType, seasonId, episodeId, maxOrder,
  onSubmitComplete
}) => {
  const buttonText = formType === 'update' ? 'Update Episode' : 'Add Episode'
  const [formData, setFormData] = useState<IEpisode>({
    id: episodeId ? episodeId : 0,
    seasonId: seasonId,
    days: 0,
    order: maxOrder ? maxOrder + 1 : 0,
    name: '',
    airingDate: fixDate(''),
    premiere: maxOrder ? maxOrder + 1 === 1 : false,
    merge: false,
    final: false,
    notes: ''
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (!episodeId) return

    if (formType === 'update' && episodeId) {
      readEpisode(episodeId, setFormData)
    }
  }, [episodeId, formType])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: IEpisode) => {
    setDisableAjax(false)
    onSubmitComplete(data)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!episodeId) return

    if (disableAjax) return
    setDisableAjax(true)

    if (formType === 'update') {
      updateEpisode(episodeId, formData, formSubmitCallback)
    } else {
      createSeasonEpisode(seasonId, formData, formSubmitCallback)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Columns>
        <Columns.Column size={4}>
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
      </Columns>

      <Columns>
        <Columns.Column size={5}>
          <Form.Field>
            <Form.Label>Air Date</Form.Label>
            <Form.Control>


              <DatePicker
                dateFormat={'yyyy-MM-dd'}
                selected={new Date(formData.airingDate)}
                onChange={(date) => setFormData({ ...formData, airingDate: fixDate(date) })}
                showIcon
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>Episode Type</Form.Label>
            <Form.Field.Body>
              <Form.Field>
                <Form.Control>
                  <Form.Checkbox
                    checked={formData.premiere}
                    onChange={(e) => setFormData({ ...formData, premiere: e.target.checked })}
                  >
                    Premiere
                  </Form.Checkbox>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Checkbox
                    checked={formData.merge}
                    onChange={(e) => setFormData({ ...formData, merge: e.target.checked })}
                  >
                    Merge
                  </Form.Checkbox>
                </Form.Control>
              </Form.Field>

              <Form.Field>
                <Form.Control>
                  <Form.Checkbox
                    checked={formData.final}
                    onChange={(e) => setFormData({ ...formData, final: e.target.checked })}
                  >
                    Final
                  </Form.Checkbox>
                </Form.Control>
              </Form.Field>
            </Form.Field.Body>
          </Form.Field>
        </Columns.Column>
      </Columns>

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
        className='is-pulled-right'
      >
        {buttonText}
      </Button>
      <div className='is-clearfix'></div>
    </form>
  )
}

export default EpisodeForm