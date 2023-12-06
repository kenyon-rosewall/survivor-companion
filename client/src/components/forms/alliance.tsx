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

        <Columns.Column>
          <Form.Field>
            <Form.Label>Color</Form.Label>
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

      <Columns>
        <Columns.Column>
          <Form.Field>
            <Form.Label>Notes</Form.Label>
            <Form.Control>
              <Form.Textarea
                name="notes"
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
                name="color"
                value={formData.color}
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