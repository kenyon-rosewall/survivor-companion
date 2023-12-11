import React from 'react'
import { Modal } from 'react-bulma-components'

type ModalFormProps = {
  title: string
  isModalOpen: boolean
  closeModal: () => void
  children: React.ReactNode
}

const ModalForm : React.FC<ModalFormProps> = ({ 
  title, isModalOpen, closeModal, children 
}) => {
  return (
    <Modal
      show={isModalOpen} 
      onClose={() => closeModal()}
    >
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>
            {title}
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          {children}
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  )
}

export default ModalForm