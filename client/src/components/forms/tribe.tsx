import React, { useEffect, useState } from 'react'
import { Columns, Form, Button } from 'react-bulma-components'
import { createSeasonTribe, readTribe, updateTribe } from '../../api'

type TribeFormProps = {
  formType: string,
  seasonId: number,
  tribeId?: number,
  onSubmitComplete: () => void
}

const TribeForm: React.FC<TribeFormProps> = ({
  formType, seasonId, tribeId, onSubmitComplete
}) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    category: '',
    color: ''
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  useEffect(() => {
    if (tribeId === 0) return

    if (formType === 'update' && tribeId) {
      readTribe(tribeId, setFormData)
    }
  }, [tribeId, formType])

  const formSubmitCallback = (d: any) => {
    setDisableAjax(false)
    onSubmitComplete()
  }

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)

    if (formType === 'update' && tribeId) {
      updateTribe(tribeId, formData, formSubmitCallback)
    } else {
      createSeasonTribe(seasonId, formData, formSubmitCallback)
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <Columns>
        <Columns.Column>
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
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>
              Color
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Button
        color="primary"
        type="submit"
        className='is-pulled-right'
        disabled={disableAjax}
      >
        { formType === 'update' ? 'Update Tribe' : 'Add Tribe' }
      </Button>
    </form>
  )
}

export default TribeForm