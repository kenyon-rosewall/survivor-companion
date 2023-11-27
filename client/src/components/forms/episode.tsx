import React, { useEffect, useState } from 'react'
import { Columns, Form, Button } from 'react-bulma-components'
import DatePicker from 'react-datepicker'

type EpisodeFormProps = {
  formType: string,
  seasonId: number,
  episodeId?: number,
  maxOrder?: number,
  onSubmitComplete: (season: any) => void
}

const EpisodeForm: React.FC<EpisodeFormProps> = (props: EpisodeFormProps) => {
  const buttonText = props.formType === 'update' ? 'Update Episode' : 'Add Episode'
  const formDisabled = props.formType === 'update' && !props.episodeId
  const dateOptions: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const [formData, setFormData] = useState<any>({
    order: props.maxOrder ? props.maxOrder + 1 : 0,
    name: '',
    airingDate: new Date().toLocaleDateString('en-US', dateOptions),
    premiere: props.maxOrder ? props.maxOrder + 1 === 1 : false,
    merge: false,
    final: false,
    notes: ''
  })
  const [disableButton, setDisableButton] = useState<boolean>(false)

  useEffect(() => {
    if (props.episodeId === 0) return
    if (props.formType === 'update' && props.episodeId) {
      fetch(`http://localhost:5000/episodes/${props.episodeId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data.data)
      })
      .catch(err => console.error('Error fetching episode:', err))
    }
  }, [props.episodeId, props.formType])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (props.episodeId === 0) return
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/seasons/${props.seasonId}/episodes`
    let method = 'POST'
    if (props.formType === 'update') {
      url = `http://localhost:5000/episodes/${props.episodeId}`
      method = 'PUT'
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      props.onSubmitComplete(data.data)
      setDisableButton(false)
    })
    .catch(err => console.error('Error adding episode:', err))
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
                disabled={formDisabled}
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
                disabled={formDisabled}
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
                onChange={(date) => setFormData({ ...formData, airingDate: date })}
                showIcon
                disabled={formDisabled}
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
                    disabled={formDisabled}
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
                    disabled={formDisabled}
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
                    disabled={formDisabled}
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
            disabled={formDisabled}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color="primary"
        type="submit"
        disabled={formDisabled || disableButton}
        className='is-pulled-right'
      >
        {buttonText}
      </Button>
      <div className='is-clearfix'></div>
    </form>
  )
}

export default EpisodeForm