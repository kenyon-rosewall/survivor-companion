import React, { useEffect, useState } from 'react'
import { Columns, Form, Button } from 'react-bulma-components'

type TribeFormProps = {
  formType: string,
  seasonId: number,
  tribeId?: number,
  onSubmitComplete: (season: any) => void
}

const TribeForm: React.FC<TribeFormProps> = (props: TribeFormProps) => {
  const buttonText = props.formType === 'update' ? 'Update Tribe' : 'Add Tribe'
  const formDisabled = props.formType === 'update' && !props.tribeId
  const [formData, setFormData] = useState<any>({
    name: '',
    category: '',
    color: ''
  })
  const [disableButton, setDisableButton] = useState<boolean>(false)

  useEffect(() => {
    if (props.formType === 'update' && props.tribeId) {
      fetch(`http://localhost:5000/tribes/${props.tribeId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data.data)
      })
      .catch(err => console.error('Error fetching tribe:', err))
    }
  }, [props.tribeId])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/seasons/${props.seasonId}/tribes`
    let method = 'POST'
    if (props.formType === 'update') {
      url = `http://localhost:5000/tribes/${props.tribeId}`
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
    .catch(err => console.error('Error adding tribe:', err))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Columns>
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

        <Columns.Column>
          <Form.Field>
            <Form.Label>Color</Form.Label>
            <Form.Control>
              <Form.Input
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                disabled={formDisabled}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Button
        color="primary"
        type="submit"
        disabled={formDisabled || disableButton}
        className='is-pulled-right'
      >
        {buttonText}
      </Button>
    </form>
  )
}

export default TribeForm