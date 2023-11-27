import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Tag } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from '@fortawesome/fontawesome-svg-core'

type PlayerInEpisodeFormProps = {
  pie: any
  tribes: any[]
  seasonId: number
  hasShotInTheDark: boolean
  // globalEditing: boolean
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
  // const prevEditing = useRef<boolean>(editing)

  const saveFormData = useCallback(() => {
    setSavingData(true)
    let url = `http://localhost:5000/playerInEpisodes/${props.pie.id}`
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
  }, [formData, props.pie.id])

  useEffect(() => {
    setFormData({
      playerName: props.pie.player?.name,
      status: props.pie.status,
      tribe: {
        id: props.pie.tribeId,
        name: props.pie.tribe?.name,
        color: props.pie.tribe?.color
      },
      advantages: props.pie.advantages,
      alliances: props.pie.alliances,
      shotInTheDark: props.pie.shotInTheDark,
      notes: props.pie.notes
    })
  }, [props.pie])

  // useEffect(() => {
  //   prevEditing.current = editing
  //   setEditing(props.globalEditing)
  // }, [props.globalEditing])

  // useEffect(() => {
  //   console.log(`editing changed (${props.pie.playerId}): `, prevEditing)
  //   if (prevEditing.current === true && editing === false) {
  //     saveFormData()
  //   }
  // }, [editing, saveFormData])

  const renderPlayerName = () => {
    return (
      <td>{formData.playerName}</td>
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
      <option key={index} value={status}>{status}</option>
    ))
  }

  const renderStatus = () => {
    return (
      <td>
        {editing ? (
          <Form.Select value={formData.status} onChange={handleStatus}>
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

  const renderTribeOptions = () => {
    return (
      <>
        <option value="0" data-color=""></option>
        {props.tribes.map(tribe => (
          <option key={tribe.id} value={tribe.id} data-color={tribe.color}>
            {tribe.name}
          </option>
        ))}
      </>
    )
  }
  
  const renderTribe = () => {
    return (
      <td>
        {editing ? (
          <Form.Select value={formData.tribe.id} onChange={handleTribe}>
            {renderTribeOptions()}
          </Form.Select>
        ) : (
          <Tag color={formData.tribe.color}>{formData.tribe.name}</Tag>
        )}
      </td>
    )
  }

  const renderAdvantages = () => {
    return (
      <td>
        <Tag.Group>
          {props.pie.advantages.map((advantage: any) => (
            <Tag key={advantage.id}>{advantage.name}</Tag>
          ))}
        </Tag.Group>
      </td>
    )
  }

  const renderAlliances = () => {
    return (
      <td>
        <Tag.Group>
          {props.pie.alliances.map((alliance: any) => (
            <Tag key={alliance.id} color={alliance.color}>{alliance.name}</Tag>
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
    let i: IconName = "square"
    if (props.pie.shotInTheDark) i = "square-check"

    return (
      editing ? (
        <Form.Checkbox checked={formData.shotInTheDark} onChange={handleShotInTheDark} />
      ) : (
        <FontAwesomeIcon icon={["fas", i]} />
      )
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
      <td>
        {editing ? (
          <Form.Textarea size={"small"} onChange={handleNotes}>{formData.notes}</Form.Textarea>
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
      <td align="center" width={10}>
        <Button disabled={savingData} color='primary' size={'small'} onClick={handleEdit}>
          <FontAwesomeIcon icon={["fas", i]} />
        </Button>
      </td>
    )
  }
  
  return (
    <tr key={props.pie.id}>
      {renderPlayerName()}
      {renderStatus()}
      {renderTribe()}
      {renderAdvantages()}
      {renderAlliances()}
      { props.hasShotInTheDark ? renderShotInTheDark() : null}
      {renderNotes()}
      {renderEdit()}
    </tr>
  )
}

export default PlayerInEpisodeForm