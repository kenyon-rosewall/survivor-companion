import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bulma-components'

type AdvantageFormProps = {
  formType: string,
  advantageId?: number,
  onSubmitComplete: (season: any) => void
}

const AdvantageForm: React.FC<AdvantageFormProps> = (props: AdvantageFormProps) => {
  const buttonText = props.formType === 'update' ? 'Update Advantage' : 'Add Advantage'
  const formDisabled = props.formType === 'update' && !props.advantageId
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (props.advantageId === 0) return
    if (props.formType === 'update' && props.advantageId) {
      fetch(`http://localhost:5000/advantages/${props.advantageId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data.data)
      })
      .catch(err => console.error('Error fetching advantage:', err))
    }
  }, [props.advantageId, props.formType])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/advantages`
    let method = 'POST'
    if (props.formType === 'update') {
      url = `http://localhost:5000/advantages/${props.advantageId}`
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
    .catch(err => console.error('Error adding advantage:', err))
  }

  return (
    <>
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

      <Form.Field>
        <Form.Label>Description</Form.Label>
        <Form.Control>
          <Form.Textarea
            name="description"
            value={formData.description}
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
        onClick={handleFormSubmit}
      >
        {buttonText}
      </Button>
    </>
  )
}

export default AdvantageForm