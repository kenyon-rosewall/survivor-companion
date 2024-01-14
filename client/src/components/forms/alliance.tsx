import React, { useState } from "react"
import { Button, Columns, Form } from "react-bulma-components"
import { createSeasonAlliance } from "../../api"
import { IAlliance } from "../../models"

type AllianceFormProps = {
  seasonId: number
  allianceCallback: () => void
}

const AllianceForm: React.FC<AllianceFormProps> = ({ 
  seasonId, allianceCallback 
}) => {
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [formData, setFormData] = useState<IAlliance>({ 
    id: 0,
    seasonId: seasonId,
    name: "",
    color: "",
    notes: ""
  })

  const handleFormSubmitCallback = (data: IAlliance) => {
    setDisableAjax(false)
    setFormData({ id: 0, seasonId: seasonId, name: "", color: "", notes: "" })
    allianceCallback()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)
    
    createSeasonAlliance(seasonId, formData, handleFormSubmitCallback)
  }

  return (
    <form 
      onSubmit={handleFormSubmit}
    >
      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label
              size={'small'}
            >
              Name
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="name"
                size={'small'}
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>

          <Form.Field>
            <Form.Label
              size={'small'}
            >
              Color
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="color"
                size={'small'}
                value={formData.color}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label
              size={'small'}
            >
              Notes
            </Form.Label>
            <Form.Control>
              <Form.Textarea
                name="notes"
                size={'small'}
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Control>
              <Button
                color={'primary'}
                className="is-pulled-right"
              >
                Add Alliance
              </Button>
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>
    </form>
  )
}

export default AllianceForm