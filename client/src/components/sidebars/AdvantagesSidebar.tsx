import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { readAdvantages } from '../../api'
import { setSelectedAdvantage } from '../../actions/seasons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalForm from '../common/modalForm'
import AdvantageForm from '../forms/advantage'
import { read } from 'fs'
import { IAdvantage } from '../../models'

type AdvantagesSidebarProps = {
  advantageId: number
}

const AdvantagesSidebar: React.FC<AdvantagesSidebarProps> = ({ advantageId }) => {
  const dispatch = useDispatch()
  const [advantages, setAdvantages] = useState<IAdvantage[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    readAdvantages(setAdvantages)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      const modalEl = document.querySelector('.modal')
      if (modalEl) {
        modalEl.scrollTop = 0
      }
    }
  }, [isModalOpen])

  const renderAdvantages = (): React.ReactNode => {
    if (!advantages) return

    return advantages.map((advantage: IAdvantage) => (
      <Menu.List.Item
        key={advantage.id}
        active={advantage.id === advantageId}
        onClick={() => dispatch(setSelectedAdvantage(advantage.id))}
      >
        {advantage.name}
      </Menu.List.Item>
    ))
  }

  const handleFormSubmit = () => {
    setIsModalOpen(false)
    readAdvantages(setAdvantages)
  }

  return (
    <>
      <Menu.List.Item
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon 
          icon={["fas", "plus"]}
        />
        Add Advantage
      </Menu.List.Item>
      {renderAdvantages()}

      <ModalForm
        title='Add Advantage'
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <AdvantageForm
          formType='create'
          onSubmitComplete={handleFormSubmit}
        />
      </ModalForm>
      
    </>
  )
}

export default AdvantagesSidebar