import React, { useEffect, useState } from "react"
import { Button, Form, Tag } from "react-bulma-components"
import { updatePlayerInEpisode, deleteAlliancePlayer } from "../../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TribeSelect from '../common/tribeSelect'

type PlayerInEpisodeFormProps = {
  playerInEpisode: any
  tribes: any[]
  renderShotInTheDark: boolean
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayerInEpisodeForm: React.FC<PlayerInEpisodeFormProps> = ({
  playerInEpisode, tribes, renderShotInTheDark, 
  refreshAlliances, toggleRefreshEpisode, setRefreshAlliances
}) => {
  const playerStatuses = ["playing", "eliminated", "redemption", "edge"]
  const [editing, setEditing] = useState<boolean>(false)
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
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

  useEffect(() => {
    if (!playerInEpisode) return
    
    setFormData({
      playerName: playerInEpisode.player?.name,
      status: playerInEpisode.status,
      tribe: {
        id: playerInEpisode.tribeId,
        name: playerInEpisode.tribe?.name,
        color: playerInEpisode.tribe?.color
      },
      advantages: playerInEpisode.advantages,
      alliances: playerInEpisode.alliances,
      shotInTheDark: playerInEpisode.shotInTheDark,
      notes: playerInEpisode.notes
    })
  }, [playerInEpisode])
  
  const saveFormData = () => {
    if (disableAjax === true) return
    setDisableAjax(true)

    const saveFormDataCallback = () => {
      setDisableAjax(false)
    }

    updatePlayerInEpisode(
      playerInEpisode.id,
      {
        status: formData.status,
        tribeId: formData.tribe.id,
        shotInTheDark: formData.shotInTheDark,
        notes: formData.notes
      },
      saveFormDataCallback
    )
  }

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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, status: e.target.value })
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
        { editing ? (
          <Form.Select
            value={formData.status}
            onChange={handleStatusChange}
          >
            {renderStatusOptions()}
          </Form.Select>
        ) : (
          formData.status
        )}
      </td>
    )
  }

  const handleTribeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        { editing ? (
          <TribeSelect
            tribes={tribes}
            selectedTribeId={formData.tribe.id}
            handleTribeChange={handleTribeChange}
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
          {playerInEpisode.advantages?.map((advantage: any) => (
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

  const removePlayerFromAlliance = (index: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)
    
    const allianceId = playerInEpisode.alliances[index].id

    const deleteAlliancePlayerCallback = () => {
      toggleRefreshEpisode()
      setDisableAjax(false)
      setRefreshAlliances(!refreshAlliances)
    }

    deleteAlliancePlayer(allianceId, playerInEpisode.id, deleteAlliancePlayerCallback)
  }

  const renderAlliances = () => {
    return (
      <td>
        <Tag.Group>
          {playerInEpisode.alliances?.map((alliance: any, index: number) => (
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
                onClick={() => removePlayerFromAlliance(index)} 
              />
            </Tag>
          ))}
        </Tag.Group>  
      </td>
    )
  }

  const handleShot = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, shotInTheDark: e.target.checked })
  }
  
  const renderShot = () => {
    if (!renderShotInTheDark) return null

    return (
      <td
        align="center"
      >
        { editing ? (
          <Form.Checkbox
            checked={formData.shotInTheDark}
            onChange={handleShot}
          />
        ) : (
          <FontAwesomeIcon
            icon={["fas", (playerInEpisode.shotInTheDark) ? "square-check" : "square"]}
          />
        )}
      </td>
    )
  }

  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, notes: e.target.value })
  }

  const renderNotes = () => {
    return (
      <td
        className="is-size-7"
        style={{
          whiteSpace: 'pre-wrap'
        }}
      >
        { editing ? (
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

  const toggleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editing) saveFormData()
    setEditing(!editing)
  }

  const renderEdit = () => {
    return (
      <td
        align="center" 
        width={10}
      >
        <Button 
          disabled={disableAjax} 
          color='primary' 
          size={'small'} 
          onClick={toggleEdit}
        >
          <FontAwesomeIcon
            icon={["fas", (editing) ? "floppy-disk" : "edit" ]}
          />
        </Button>
      </td>
    )
  }
  
  return (
    <tr
      key={playerInEpisode.id}
    >
      {renderPlayerName()}
      {renderStatus()}
      {renderTribe()}
      {renderAdvantages()}
      {renderAlliances()}
      {renderShot()}
      {renderNotes()}
      {renderEdit()}
    </tr>
  )
}

export default PlayerInEpisodeForm