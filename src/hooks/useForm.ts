import {
  FormEvent,
  FocusEvent,
  ChangeEvent,
  useCallback,
  useEffect,
  useState
} from 'react'

export type FormTouched<T> = Partial<Record<keyof T, boolean>>
export type FormError<T> = Partial<Record<keyof T, string | undefined>>

interface Props<T> {
  initialValues: T
  validate?: (values: T) => Partial<FormError<T>>
}

const useForm = <T extends object>({ validate, initialValues }: Props<T>) => {
  const [isDirty, setIsDirty] = useState(false)
  const [state, setState] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormError<T>>({})
  const [touched, setTouched] = useState<FormTouched<T>>({})

  // Settings values

  const clear = useCallback(() => setState(initialValues), [])

  const setField = useCallback(
    (name: keyof T, value: string | number | File | number[]) => {
      setState((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const setFields = useCallback((values?: Partial<T>) => {
    setState((prev) => ({ ...prev, ...values }))
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = e.target.name as keyof T
      const value = e.target.value
      setState((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLSelectElement, Element>) => {
      const name = e.target.name as keyof T
      setTouched((prev) => ({ ...prev, [name]: true }))
    },
    []
  )

  const toggleDirty = useCallback((isDirty?: boolean) => {
    setIsDirty((prev) => (typeof isDirty === 'boolean' ? isDirty : !prev))
  }, [])

  // Validate Errors
  const hasErrors = useCallback((errors: Partial<FormError<T>>) => {
    return Object.keys(errors).length !== 0
  }, [])

  // Inputs default props
  const inputProps = (name: keyof T) => {
    return {
      name,
      error: errors[name],
      value: state[name]!,
      onBlur: handleBlur,
      onChange: handleChange
    }
  }

  // OnSubmit middleware
  const onSubmit = useCallback(
    (cb: () => void) => {
      return (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toggleDirty(true)

        if (typeof validate !== 'function') return cb()
        const newErrors = validate(state)
        if (!hasErrors(newErrors)) return cb()
        setErrors(newErrors)
      }
    },
    [state]
  )

  useEffect(() => {
    if (isDirty) {
      if (typeof validate === 'function') {
        const newErrors = validate(state)
        setErrors(newErrors)
      }
    }
  }, [state, isDirty])

  return {
    values: state,
    errors,
    touched,
    hasErrors,
    clear,
    onSubmit,
    setField,
    setFields,
    setErrors,
    setTouched,
    handleBlur,
    inputProps,
    toggleDirty,
    handleChange
  }
}

export default useForm
