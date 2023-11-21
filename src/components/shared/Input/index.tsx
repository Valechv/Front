import {
  useId,
  SVGProps,
  forwardRef,
  ReactElement,
  InputHTMLAttributes,
  ForwardedRef
} from 'react'
import { classNames } from '../../../utils/classNames'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  rightElement?: ReactElement
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement
}

const Input = (
  { label, icon: Icon, rightElement, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement> | null
) => {
  const uid = useId()

  return (
    <div>
      <div className="relative bg-opacity-50w-full">
        <input
          ref={ref}
          {...props}
          id={`input-${uid}`}
          autoComplete="off"
          className={classNames([
            'border-secondary-100 focus:border-primary-100 dark:focus:border-primary-50'
          ])}
        />

        {typeof Icon === 'function' && (
          <button className="btn-icon btn-ghost-primary absolute right-3 top-[10px]">
            {<Icon />}
          </button>
        )}

        {rightElement && (
          <div className="absolute right-3 top-[5px]">{rightElement}</div>
        )}
      </div>
    </div>
  )
}

export default forwardRef(Input)
