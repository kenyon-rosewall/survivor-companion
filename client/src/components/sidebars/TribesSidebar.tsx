import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icon, Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { readSeasonTribes } from '../../api'
import { setSelectedTribe } from '../../actions/seasons'
import ModalForm from '../common/modalForm'
import TribeForm from '../forms/tribe'
import { ITribe } from '../../models'

type TribesSidebarProps = {
  seasonId: number,
  tribeId: number
}

const TribesSidebar: React.FC<TribesSidebarProps> = ({ seasonId, tribeId }) => {
  const dispatch = useDispatch()
  const [tribes, setTribes] = useState<ITribe[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (seasonId === 0) return

    readSeasonTribes(seasonId, setTribes)
  }, [seasonId])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderTribes = () => {
    if (!tribes) return 

    return tribes.map((tribe: ITribe) => (
      <Menu.List.Item
        key={tribe.id}
        active={tribe.id === tribeId}
        onClick={() => dispatch(setSelectedTribe(tribe.id))}
      >
        {tribe.name} 
        <Icon
          className='is-pulled-right'
          size="small"
        >
          <FontAwesomeIcon 
            icon={["fas", "circle"]} 
            style={{ 
              color: tribe.color
            }} 
          />
        </Icon>
      </Menu.List.Item>
    ))
  }

  const handleFormSubmit = () => {
    setIsModalOpen(false)
    readSeasonTribes(seasonId, setTribes)
  }

  return (
    <>
      <Menu.List.Item
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon 
          icon={["fas", "plus"]}  
        />
        Add Tribe
      </Menu.List.Item>
      {renderTribes()}

      <ModalForm
        title='Add Tribe'
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <TribeForm 
          formType="add"
          seasonId={seasonId}
          onSubmitComplete={handleFormSubmit} 
        />
      </ModalForm>
      
    </>
  )
}

export default TribesSidebar