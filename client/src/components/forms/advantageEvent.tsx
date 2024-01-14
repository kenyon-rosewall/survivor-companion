import React, { useState, useEffect, HtmlHTMLAttributes } from "react"
import { Button, Form } from 'react-bulma-components'
import { readAdvantages, createEpisodeAdvantageEvent } from "../../api"
import { AdvantageEventCategoryEnum, IAdvantage, IAdvantageEvent, IPlayer, IPlayerInEpisode } from "../../models"

type AdvantageEventFormProps = {
  episodeId: number
  playersInEpisode: any[]
  callback: () => void;
}

type AdvantageEventCategory = {
  value: AdvantageEventCategoryEnum
  label: string
}

const AdvantageEventForm: React.FC<AdvantageEventFormProps> = ({
  episodeId, playersInEpisode, callback
}) => {
  const [advantages, setAdvantages] = useState<IAdvantage[]>([])
  const categories: AdvantageEventCategory[] = [
    { value: AdvantageEventCategoryEnum.Obtained, label: 'Obtained' },
    { value: AdvantageEventCategoryEnum.Played, label: 'Played' },
    { value: AdvantageEventCategoryEnum.Transferred, label: 'Transferred' },
    { value: AdvantageEventCategoryEnum.Lost, label: 'Lost' },
    { value: AdvantageEventCategoryEnum.Expired, label: 'Expired' },
  ]
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [formData, setFormData] = useState<IAdvantageEvent>({
    id: 0,
    playerInEpisodeId: 0,
    advantageId: 0,
    category: AdvantageEventCategoryEnum.Obtained,
    notes: ''
  })

  useEffect(() => {
    readAdvantages(setAdvantages)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmitCallback = (data: IAdvantageEvent) => {
    setDisableAjax(false)
    callback()
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)

    createEpisodeAdvantageEvent(episodeId, formData, formSubmitCallback)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Form.Field>
        <Form.Label>Player</Form.Label>
        <Form.Control>
          <Form.Select
            name='playerInEpisodeId'
            value={formData.playerInEpisodeId}
            onChange={handleInputChange}
          >
            <option value=''>Select Player</option>
            {playersInEpisode.map((pie: IPlayerInEpisode) => (
              <option key={pie.id} value={pie.id}>{pie.player?.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
        <Form.Label>Advantage</Form.Label>
        <Form.Control>
          <Form.Select
            name='advantageId'
            value={formData.advantageId}
            onChange={handleInputChange}
          >
            <option value=''>Select Advantage</option>
            {advantages.map((advantage: IAdvantage) => (
              <option key={advantage.id} value={advantage.id}>{advantage.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
        <Form.Label>Category</Form.Label>
        <Form.Control>
          <Form.Select
            name='category'
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value=''>Select Category</option>
            {categories.map((category: AdvantageEventCategory, index: number) => (
              <option key={index} value={category.value}>{category.label}</option>
            ))}
          </Form.Select>
        </Form.Control>
        <Form.Label>Notes</Form.Label>
        <Form.Control>
          <Form.Textarea
            name='notes'
            value={formData.notes}
            onChange={handleInputChange}
          />
        </Form.Control>
        <Button>
          Add Advantage Event
        </Button>
      </Form.Field>
    </form>
  )
}

export default AdvantageEventForm