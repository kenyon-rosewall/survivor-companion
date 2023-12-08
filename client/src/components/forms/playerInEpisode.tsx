import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Tag } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from '@fortawesome/fontawesome-svg-core'
import TribeSelect from '../common/tribeSelect'

type PlayerInEpisodeFormProps = {
  playerInEpisode: any
  tribes: any[]
  seasonId: number
  renderShotInTheDark: boolean
  toggleRefreshEpisodeChildren: () => void
  toggleRefreshEpisode: () => void
}

const PlayerInEpisodeForm: React.FC<PlayerInEpisodeFormProps> = (props: PlayerInEpisodeFormProps) => {
  const [editing, setEditing] = useState<boolean>(false)
  const playerStatuses = ["playing", "eliminated", "redemption", "edge"]
  const [formData, setFormData] = useState<any>({
    playerName: "",
    status: "playing",
    tribe: {
      id: 0,
      name: "",
      color: ""
    },
    advantages: [],
    alliances: [],
    shotInTheDark: false,
    notes: ""
  })
  const [savingData, setSavingData] = useState<boolean>(false)

  const saveFormData = useCallback(() => {
    setSavingData(true)
    let url = `http://localhost:5000/playerInEpisodes/${props.playerInEpisode.id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: formData.status,
        tribeId: formData.tribe.id,
        shotInTheDark: formData.shotInTheDark,
        notes: formData.notes
      })
    })
    .then(response => response.json())
    .then(data => {
      setSavingData(false)
    })
    .catch(err => console.error('Error:', err))
  }, [formData, props.playerInEpisode.id])

  useEffect(() => {
    setFormData({
      playerName: props.playerInEpisode.player?.name,
      status: props.playerInEpisode.status,
      tribe: {
        id: props.playerInEpisode.tribeId,
        name: props.playerInEpisode.tribe?.name,
        color: props.playerInEpisode.tribe?.color
      },
      advantages: props.playerInEpisode.advantages,
      alliances: props.playerInEpisode.alliances,
      shotInTheDark: props.playerInEpisode.shotInTheDark,
      notes: props.playerInEpisode.notes
    })
  }, [props.playerInEpisode])

  const renderPlayerName = () => {
    return (
      <td 
        style={{ 
          textDecorationLine: formData.status === 'eliminated' ? 'line-through' : 'none' 
        }}
      >
        {formData.playerName}
      </td>
    )
  }

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      status: e.target.value
    })
  }

  const renderStatusOptions = () => {
    return playerStatuses.map((status, index) => (
      <option
        key={index} 
        value={status}
      >
        {status}
      </option>
    ))
  }

  const renderStatus = () => {
    return (
      <td>
        {editing ? (
          <Form.Select
            value={formData.status}
            onChange={handleStatus}
          >
            {renderStatusOptions()}
          </Form.Select>
        ) : (
          formData.status
        )}
      </td>
    )
  }

  const handleTribe = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const s: HTMLSelectElement = e.target as HTMLSelectElement;
    setFormData({
      ...formData,
      tribe: {
        id: Number(s.value),
        name: s.options[s.selectedIndex].text,
        color: s.options[s.selectedIndex].dataset.color
      }
    })
  }

  const renderTribe = () => {
    return (
      <td>
        {editing ? (
          <TribeSelect
            tribes={props.tribes}
            selectedTribeId={formData.tribe.id}
            handleTribeChange={handleTribe}
          />
        ) : (
          <Tag
            style={{ 
              backgroundColor: formData.tribe.color,
              color: 'black' 
            }}
          >
            {formData.tribe.name}
          </Tag>
        )}
      </td>
    )
  }

  const renderAdvantages = () => {
    return (
      <td>
        <Tag.Group>
          {props.playerInEpisode.advantages?.map((advantage: any) => (
            <Tag
              key={advantage.id}
            >
              {advantage.name}
            </Tag>
          ))}
        </Tag.Group>
      </td>
    )
  }

  const removeAlliance = (index: number) => {
    const allianceId = props.playerInEpisode.alliances[index].id
    fetch(`http://localhost:5000/alliances/${allianceId}/players/${props.playerInEpisode.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .then(response => {
      props.toggleRefreshEpisodeChildren()
      props.toggleRefreshEpisode()
    })
    .catch(err => console.error('Error removing player from alliance:', err))
  }

  const renderAlliances = () => {
    return (
      <td>
        <Tag.Group>
          {props.playerInEpisode.alliances?.map((alliance: any, index: number) => (
            <Tag
              key={alliance.id}
              style={{ 
                backgroundColor: alliance.color 
              }}
            >
              {alliance.name}
              <Button
                remove
                size={'small'}
                onClick={() => removeAlliance(index)} 
              />
            </Tag>
          ))}
        </Tag.Group>  
      </td>
    )
  }

  const handleShotInTheDark = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      shotInTheDark: e.target.checked
    })
  }
  
  const renderShotInTheDark = () => {
    if (!props.renderShotInTheDark) return null
    let i: IconName = "square"
    if (props.playerInEpisode.shotInTheDark) i = "square-check"

    return (
      <td
        align="center"
      >
        {editing ? (
          <Form.Checkbox
            checked={formData.shotInTheDark}
            onChange={handleShotInTheDark}
          />
        ) : (
          <FontAwesomeIcon
            icon={["fas", i]}
          />
        )}
      </td>
    )
  }

  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      notes: e.target.value
    })
  }

  const renderNotes = () => {
    return (
      <td
        className="is-size-7"
      >
        {editing ? (
          <Form.Textarea
            size={"small"}
            onChange={handleNotes}
          >
            {formData.notes}
          </Form.Textarea>
        ) : (
          formData.notes
        )}
      </td>
    )
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editing) saveFormData()
    setEditing(!editing)
  }

  const renderEdit = () => {
    let i: IconName = "edit"
    if (editing) i = "floppy-disk"
    return (
      <td
        align="center" 
        width={10}
      >
        <Button 
          disabled={savingData} 
          color='primary' 
          size={'small'} 
          onClick={handleEdit}
        >
          <FontAwesomeIcon
            icon={["fas", i]}
          />
        </Button>
      </td>
    )
  }
  
  return (
    <tr
      key={props.playerInEpisode.id}
    >
      {renderPlayerName()}
      {renderStatus()}
      {renderTribe()}
      {renderAdvantages()}
      {renderAlliances()}
      {renderShotInTheDark()}
      {renderNotes()}
      {renderEdit()}
    </tr>
  )
}

export default PlayerInEpisodeForm