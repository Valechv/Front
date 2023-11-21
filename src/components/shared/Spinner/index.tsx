import { classNames } from "../../../utils/classNames"


type Color = 'primary' | 'secondary' | 'white'

interface Props {
  color?: Color
}

const colors: Record<Color, string> = {
  white: 'border-t-white border-l-white',
  primary:
    'border-t-primary dark:border-t-primary border-l-primary dark:border-l-primary',
  secondary:
    'border-t-secondary-300 dark:border-t-secondary-500 border-l-secondary-300 dark:border-l-secondary-500'
}

const Spinner = ({ color = 'primary' }: Props) => {
  return (
    <div
      className={classNames([
        colors[color],
        'h-[21px] w-[21px] rounded-[50%] border-[3.5px] border-r-transparent border-b-transparent animate-spin'
      ])}
    />
  )
}

export default Spinner
