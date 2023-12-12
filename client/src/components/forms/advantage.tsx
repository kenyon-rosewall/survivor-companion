import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bulma-components'
import { createAdvantage, readAdvantage, readAdvantages, updateAdvantage } from '../../api'

type AdvantageFormProps = {
  formType: string,
  advantageId?: number,
  onSubmitComplete: (season: any) => void
}

const AdvantageForm: React.FC<AdvantageFormProps> = ({
  formType, advantageId, onSubmitComplete
}) => {
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (advantageId === 0) return

    if (formType === 'update' && advantageId) {
      readAdvantage(advantageId, setFormData)
    }
  }, [advantageId, formType])

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (d: any) => {
    setDisableAjax(false)
    onSubmitComplete(d)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)

    if (formType === 'update' && advantageId) {
      updateAdvantage(advantageId, formData, formSubmitCallback)
    } else {
      createAdvantage(formData, formSubmitCallback)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <Form.Field>
        <Form.Label>
          Name
        </Form.Label>
        <Form.Control>
          <Form.Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>
          Description
        </Form.Label>
        <Form.Control>
          <Form.Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color="primary"
        type="submit"
        disabled={disableAjax}
        className='is-pulled-right'
      >
        { formType === 'update' ? 'Update Advantage' : 'Add Advantage' }
      </Button>
    </form>
  )
}

export default AdvantageForm