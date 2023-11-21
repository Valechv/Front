import { ForwardedRef, forwardRef } from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'

import Spinner from '../Spinner'
import { ButtonVariant, variants } from './variants'
import { classNames } from '../../../utils/classNames'

type Ref = ForwardedRef<HTMLButtonElement> | null
type Color = 'primary' | 'secondary' | 'white' | 'dark'
type TypeContentPosition = 'start' | 'center' | 'end'

const positions: Record<TypeContentPosition, string> = {
  center: 'flex items-center justify-center gap-3 py-2 px-8',
  end: 'flex items-center justify-start gap-3 py-2',
  start: 'flex items-center justify-end gap-3 py-2'
}

interface Props extends HTMLMotionProps<'button'> {
  color?: Color
  isIcon?: boolean
  isLoading?: boolean
  variant?: ButtonVariant
  contentPosition?: TypeContentPosition
}

const btnIcon =
  'border-[1.5px] w-[35px] h-[35px] outline-none rounded grid place-items-center cursor-pointer'
const btn = 'border-[1.5px] font-medium outline-none rounded cursor-pointer'

const Button = (
  {
    isIcon,
    isLoading,
    color = 'primary',
    variant = 'solid',
    contentPosition = 'center',
    ...props
  }: Props,
  ref: Ref
) => {
  return (
    <motion.button
      {...props}
      ref={ref}
      whileTap="tap"
      variants={{ tap: { scale: 0.988 } }}
      disabled={props.disabled || isLoading}
      className={classNames([
        'duration-200 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed',
        variants[variant][color],
        props.className,
        isIcon ? btnIcon : `${btn} ${positions[contentPosition]}`
      ])}
    >
      {/* {!isIcon && !isLoading && props.children} */}
      {props.children as React.ReactNode}
      {/* {isIcon && !isLoading && props.children} */}
      {isLoading && (
        <Spinner color={color === 'primary' ? 'white' : 'primary'} />
      )}
    </motion.button>
  )
}

export default forwardRef(Button)
