import React, { useState } from "react"
import { Button, Columns, Form } from "react-bulma-components"

type AllianceFormProps = {
  seasonId: number
  callback: () => void
}

const AllianceForm: React.FC<AllianceFormProps> = ({ seasonId, callback }) => {
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
    name: "",
    color: "",
    notes: ""
  })

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    setDisableButton(true)
    fetch(`http://localhost:5000/seasons/${seasonId}/alliances`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setDisableButton(false)
      setFormData({
        name: "",
        color: "",
        notes: ""
      })
      callback()
    })
    .catch(err => console.error("Error adding alliance:", err))
  }

  return (
    <form>
      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label size={'small'}>Name</Form.Label>
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
            <Form.Label size={'small'}>Color</Form.Label>
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
            <Form.Label size={'small'}>Notes</Form.Label>
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
                onClick={handleFormSubmit}
                disabled={disableButton}
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