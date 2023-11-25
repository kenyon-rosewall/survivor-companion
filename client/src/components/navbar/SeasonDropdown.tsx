import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSeason, setSelectedEpisode, setSelectedPlayer } from '../../actions/seasons'
import { Form } from 'react-bulma-components'
const { Select } = Form

const SeasonDropdown: React.FC = () => {
  const dispatch = useDispatch()
  const [seasons, setSeasons] = useState<any[]>([])
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)

  useEffect(() => {
    fetch('http://localhost:5000/seasons')
      .then(response => response.json())
      .then(data => {
        setSeasons(data.data)
      })
      .catch(err => console.error('Error fetching seasons:', err))
  }, [selectedSeason])

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeason = Number(e.target.value)
    dispatch(setSelectedSeason(selectedSeason))
    dispatch(setSelectedEpisode(0))
    dispatch(setSelectedPlayer(0))
  }

  const renderDropdownItems = () => {
    return seasons.map((season, index) => (
      <option key={season.order} value={season.id}>
        Season {season.order}: {season.name}
      </option>
    ))
  }

  return (
    <Select
      onChange={handleSeasonChange}
    >
      <option value="0">Choose a season...</option>
      {renderDropdownItems()}
    </Select>
  )
}

export default SeasonDropdown
