import React, { useEffect, useState } from 'react'
import { Columns, Form, Button } from 'react-bulma-components'
import { createSeasonTribe, readTribe, updateTribe } from '../../api'
import { ITribe } from '../../models'

type TribeFormProps = {
  formType: string,
  seasonId: number,
  tribeId?: number,
  onSubmitComplete: () => void
  setTribeColor?: (color: string) => void
}

const TribeForm: React.FC<TribeFormProps> = ({
  formType, seasonId, tribeId, onSubmitComplete, setTribeColor
}) => {
  const [formData, setFormData] = useState<ITribe>({
    id: 0,
    name: '',
    category: '',
    color: ''
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  const tribeCallback = (data: ITribe) => {
    setFormData(data)
    if (setTribeColor)
      setTribeColor(data.color ?? '')
  }

  useEffect(() => {
    if (tribeId === 0) return

    if (formType === 'update' && tribeId) {
      readTribe(tribeId, tribeCallback)
    }
  }, [tribeId, formType])

  const formSubmitCallback = (data: ITribe) => {
    setDisableAjax(false)
    onSubmitComplete()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      >
        { formType === 'update' ? 'Update Tribe' : 'Add Tribe' }
      </Button>
    </form>
  )
}

export default TribeForm