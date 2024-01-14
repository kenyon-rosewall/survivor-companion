import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bulma-components'
import { createAdvantage, readAdvantage, updateAdvantage } from '../../api'
import { IAdvantage } from '../../models'

type AdvantageFormProps = {
  formType: string,
  advantageId?: number,
  onSubmitComplete: (advantage: IAdvantage) => void
}

const AdvantageForm: React.FC<AdvantageFormProps> = ({
  formType, advantageId, onSubmitComplete
}) => {
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [formData, setFormData] = useState<IAdvantage>({
    id: 0,
    name: '',
    description: ''
  })

  useEffect(() => {
    if (advantageId === 0) return

    if (formType === 'update' && advantageId) {
      readAdvantage(advantageId, setFormData)
    }
  }, [advantageId, formType])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: IAdvantage) => {
    setDisableAjax(false)
    onSubmitComplete(data)
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
        className='is-pulled-right'
      >
        { formType === 'update' ? 'Update Advantage' : 'Add Advantage' }
      </Button>
    </form>
  )
}

export default AdvantageForm