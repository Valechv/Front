import { motion } from 'framer-motion'
import Sidebar from '.'

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { ease: 'easeInOut' }
  },
  closed: {
    opacity: 0,
    x: '-100%',
    transition: { ease: 'easeOut' }
  }
}

const fade = {
  open: { opacity: 1, pointerEvents: 'unset' },
  closed: { opacity: 0, pointerEvents: 'none' }
} as const
interface SidebarDrawerProps {
  isOpen: boolean
  onClose: () => void
}
const SidebarDrawer = ({ isOpen, onClose }: SidebarDrawerProps) => {
  return (
    <div className="absolute top-0 z-40 h-screen md:left-auto md:bottom-px">
      <motion.div
        variants={fade}
        onClick={onClose}
        animate={isOpen ? 'open' : 'closed'}
        initial={{ opacity: 0, pointerEvents: 'none' }}
        className="fixed top-0 w-full h-screen bg-black bg-opacity-50 "
      />
      <motion.div
        variants={variants}
        className="fixed top-0 left-0 z-50 h-screen "
        initial={{ opacity: 0 }}
        animate={isOpen ? 'open' : 'closed'}>
        <Sidebar mobile onClose={onClose} onToggle={() => {}} />
      </motion.div>
    </div>
  )
}
export default SidebarDrawer
