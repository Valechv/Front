import './button.css'
export type ButtonVariant = 'solid' | 'outline' | 'ghost'

interface ButtonColors {
  white: string
  primary: string
  secondary: string
  dark: string
}

export const variants: Record<ButtonVariant, ButtonColors> = {
  solid: {
    primary: 'text-white border-transparent bg-primary hover:bg-primary-500',
    secondary:
      'text-white border-transparent bg-secondary hover:bg-secondary-500',
    white: 'text-secondary border-transparent bg-white hover:bg-gray-200',
    dark: ''
  },
  outline: {
    white: 'btn-outline-white',
    primary: 'btn-outline-primary',
    secondary: 'btn-outline-secondary',
    dark: ''
  },
  ghost: {
    primary:
      'bg-transparent border-transparent text-primary hover:text-white hover:bg-primary',
    secondary:
      'bg-transparent border-transparent text-secondary hover:text-white hover:bg-secondary',
    white:
      'bg-transparent border-transparent text-white hover:text-secondary-500 hover:bg-white',
    dark: 'bg-transparent dark:bg-dark-gray dark:text-white border-transparent text-secondary'
  }
}
