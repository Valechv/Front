import { useState } from 'react'

const useToggle = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue)

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen((prev) => !prev)
  }
}

export default useToggle
