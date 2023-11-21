import { HTMLMotionProps, motion } from 'framer-motion'

interface Props extends HTMLMotionProps<'div'> {}

const fade = {
  exit: { opacity: 0 },
  initial: { opacity: 0 },
  animate: { opacity: 1 }
}

const Fade = (props: Props) => {
  return (
    <motion.div
      {...props}
      variants={fade}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {props.children}
    </motion.div>
  )
}

export default Fade
