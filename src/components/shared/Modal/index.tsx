import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  isOpen?: boolean
  children?: ReactNode
  onClose?: () => void
  zIndex?: string
}

const Modal = ({ isOpen, children, onClose, zIndex = 'z-50' }: Props) => {
  return createPortal(
    <div>
      {isOpen && (
        <motion.div
          className={`fixed w-full min-h-screen inset-0 grid place-items-center ${zIndex} overflow-y-auto`}
          exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 w-full h-full z-10"
            // exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            // initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            // animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          <motion.div
            className="z-[100]"
            exit={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </div>,
    document.getElementById('portal') as Element
  )
}

export default Modal
