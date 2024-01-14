import React, { useEffect, useState } from "react"
import { Button, Form, Tag } from "react-bulma-components"
import { updatePlayerInEpisode, deleteAlliancePlayer } from "../../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TribeSelect from '../common/tribeSelect'
import { IAdvantage, IAlliance, IPlayerInEpisode, ITribe, PlayerStatusEnum } from "../../models"
import { IconName } from "@fortawesome/fontawesome-svg-core"

type PlayerInEpisodeFormProps = {
  playerInEpisode: IPlayerInEpisode
  tribes: ITribe[]
  renderShotInTheDark: boolean
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayerInEpisodeForm: React.FC<PlayerInEpisodeFormProps> = ({
  playerInEpisode, tribes, renderShotInTheDark, 
  refreshAlliances, toggleRefreshEpisode, setRefreshAlliances
}) => {
  const playerStatuses: PlayerStatusEnum[] = [
    PlayerStatusEnum.Playing, PlayerStatusEnum.Eliminated,
    PlayerStatusEnum.Redemption, PlayerStatusEnum.Edge
  ]
  const [editing, setEditing] = useState<boolean>(false)
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [formData, setFormData] = useState<IPlayerInEpisode>({
    playerName: "",
    status: PlayerStatusEnum.Playing,
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
        id: Number(playerInEpisode.tribeId),
        name: String(playerInEpisode.tribe?.name),
        color: playerInEpisode.tribe?.color
      },
      advantages: playerInEpisode.advantages,
      alliances: playerInEpisode.alliances,
      shotInTheDark: playerInEpisode.shotInTheDark,
      notes: playerInEpisode.notes
    })
  }, [playerInEpisode])

  const saveFormDataCallback = () => {
    setDisableAjax(false)
    toggleRefreshEpisode()
  }
  
  const saveFormData = () => {
    if (disableAjax === true) return
    setDisableAjax(true)

    updatePlayerInEpisode(
      Number(playerInEpisode.id),
      {
        status: formData.status,
        tribeId: formData.tribe?.id,
        shotInTheDark: formData.shotInTheDark,
        notes: formData.notes
      },
      saveFormDataCallback
    )
  }

  const renderPlayerName = (): React.ReactNode => {
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
    setFormData({ ...formData, status: e.target.value as PlayerStatusEnum })
  }

  const renderStatusOptions = (): React.ReactNode => {
    return playerStatuses.map((status: PlayerStatusEnum, index: number) => (
      <option
        key={index} 
        value={status}
      >
        {status}
      </option>
    ))
  }

  const renderStatus = (): React.ReactNode => {
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

  const renderTribe = (): React.ReactNode => {
    return (
      <td>
        { editing ? (
          <TribeSelect
            tribes={tribes}
            selectedTribeId={Number(formData.tribe?.id)}
            handleTribeChange={handleTribeChange}
          />
        ) : (
          <Tag
            style={{ 
              backgroundColor: formData.tribe?.color,
              color: 'black' 
            }}
          >
            {formData.tribe?.name}
          </Tag>
        )}
      </td>
    )
  }

  const renderAdvantages = (): React.ReactNode => {
    return (
      <td>
        <Tag.Group>
          {playerInEpisode.advantages?.map((advantage: IAdvantage) => (
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

  const deleteAlliancePlayerCallback = () => {
    toggleRefreshEpisode()
    setDisableAjax(false)
    setRefreshAlliances(!refreshAlliances)
  }

  const removePlayerFromAlliance = (allianceId: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    const playerInEpisodeId: number = Number(playerInEpisode.id)
    if (playerInEpisodeId > 0)
      deleteAlliancePlayer(allianceId, playerInEpisodeId, deleteAlliancePlayerCallback)
  }

  const renderAlliances = (): React.ReactNode => {
    return (
      <td>
        <Tag.Group>
          {playerInEpisode.alliances?.map((alliance: IAlliance) => (
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
                onClick={() => removePlayerFromAlliance(alliance.id)} 
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
  
  const renderShot = (): React.ReactNode => {
    if (!renderShotInTheDark) return null

    const shotState: IconName = (playerInEpisode.shotInTheDark) ? "square-check" : "square"

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
            icon={["fas", shotState]}
          />
        )}
      </td>
    )
  }

  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, notes: e.target.value })
  }

  const renderNotes = (): React.ReactNode => {
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

  const renderEdit = (): React.ReactNode => {
    const editState: IconName = (editing) ? "floppy-disk" : "edit"
    
    return (
      <td
        align="center" 
        width={10}
      >
        <Button 
          color='primary' 
          size={'small'} 
          onClick={toggleEdit}
        >
          <FontAwesomeIcon
            icon={["fas", editState]}
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